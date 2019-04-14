# bearded-monk
A ultra fast and lightweight ORM MongoDB driver built on top of monk and joi, heavily inspired by Mongoose

### Usage
```javascript
const beardedMonk = require('bearded-monk')('mongodb://localhost/test3')
const {Joi, model} = beardedMonk

const userSchema = Joi.object().keys({
	name     : Joi.string().alphanum().min(3).max(32).required(),
	password : Joi.string().min(8),
	email    : Joi.string().email()
})

const User = model('User', userSchema)

const u = new User({
	name     : 'Foo',
	password : 'superSecretPassword',
	email    : 'foo@example.com'
})

u.save().then(() => {
	User.findOne({name: 'Foo'}).then((doc) => {
		console.log(doc)
	})
})
```

### Docs
- [`model(name: String, schema: Joi, ?enableLogging: Boolean = true)`](#model)
   - [`Model(data: Object)`](#Model)
      - [`save(): Promise`](#save)
      - [`static count(query: Object): Promise`](#count)
      - [`static find(query: Object): Promise`](#find)
      - [`static findOne(query: Object): Promise`](#findOne)
      - [`static remove(query: Object): Promise`](#remove)
      - [`static findOneAndDelete(query: Object): Promise`](#findOneAndDelete)
      - [`static findOneAndUpdate(query: Object, update: Object): Promise`](#findOneAndUpdate)
      - [`schema: Joi`](#schema)