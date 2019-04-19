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

u.save().then((doc) => {
	console.log(doc)

	setTimeout(() => {
		u.data.name = 'LOL'
		u.save()
	}, 5000)
})
