const beardedMonk = require('.')('mongodb://localhost/test38')
const {Joi, model} = beardedMonk

const userSchema = Joi.object().keys({
	name     : Joi.string().alphanum().min(3).max(32).required(),
	password : Joi.string().min(8),
	email    : Joi.string().email(),
	test     : Joi.string()
})

const User = model('User', userSchema, true, {})

const u = new User({
	name     : 'Foo',
	password : 'superSecretPassword',
	email    : 'foo@example.com'
})

User.findOne({name: 'SSS'}).then((us) => {
	console.log(us)
	// us.data.name = 'lol'
	// us.save()
	// console.log(us)
})

// u.save().then(() => {
// 	console.log(u)
// 	setTimeout(() => {

// 	}, 3000)
// })
