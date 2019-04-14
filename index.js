module.exports = (function() {
	const monk = require('monk')

	let db

	return function(connectionString = 'mongodb://localhost/test') {
		if (db === undefined) db = monk(connectionString)

		return {
			model : require('./model')(db),
			Joi   : require('joi')
		}
	}
})()
