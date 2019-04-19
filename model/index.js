module.exports = function(connection) {
	const pluralize = require('pluralize')
	const Joi = require('joi')

	const model = (name, schema, enableLogging = true, predefinedData = {}) => {
		const id = name.toLowerCase()

		const collection = connection.get(pluralize.plural(id))
		const schemaCollection = connection.get(`schema.${id}`)

		const schemaDescription = schema.describe()

		let log = (type, data) => {
			schemaCollection.insert({type: type, timestamp: Date.now(), ...data})
		}

		if (!enableLogging) {
			log = () => {}
		}

		collection.count().then((count) => {
			if (count === 0) {
				if (Object.keys(predefinedData).length > 0) {
					collection.insert(predefinedData)
				}
			}
		})

		schemaCollection.count({}).then((count) => {
			if (count === 0) {
				log('init', {changes: {schema: schemaDescription}})
				return
			}

			schemaCollection.findOne({type: 'init'}, {limit: 1, sort: {_id: -1}}).then((doc) => {
				if (!JSON.stringify(doc.changes.schema) == JSON.stringify(schemaDescription)) {
					//FIXME: compare 2 objects by stringifying them... :(
					log('init', {changes: {schema: schemaDescription}})
				}
			})
		})

		class Model {
			constructor(data) {
				const result = Joi.validate(data, schema)
				if (result.error) {
					throw new Error(result.error)
				}

				this.data = result.value
			}

			save() {
				return new Promise((resolve) => {
					if (this._id) {
						collection.update({_id: this._id}, this.data)
					} else {
						collection.insert(this.data).then((doc) => {
							this._id = doc._id
							log('insert', {target: doc._id})
							resolve(doc)
						})
					}
				})
			}

			static count(query) {
				return collection.count(query)
			}

			static find(query) {
				return collection.find(query)
			}

			static findOne(query) {
				return collection.findOne(query)
			}

			static remove(query) {
				return collection.remove(query)
			}

			static findOneAndDelete(query) {
				return collection.findOneAndDelete(query)
			}

			static findOneAndUpdate(query, update) {
				return collection.findOneAndUpdate(query, update)
			}
		}

		Model.schema = schema

		return Model
	}

	return model
}
