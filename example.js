const beardedMonk = require('.')('mongodb://localhost/test3')
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

u.save().then((doc) => {
	console.log(doc)
	// User.findOne({name: 'Foo'}).then((doc) => {
	// 	console.log(doc)
	// })
})
