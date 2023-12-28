const joi = require('joi')

const UserSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required()
})

const LoginSchema = joi.object({
  username: [joi.string().email().required(), joi.string().required()],
  password: joi.string().required()
})

module.exports = {
  UserSchema,
  LoginSchema
}
