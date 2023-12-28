const { BAD_REQUEST } = require('../../common/httpStatuses')
const { UserSchema, LoginSchema } = require('../../schema/user.schema')
const AppError = require('../../utils/AppError')
const { validate } = require('../../utils/validator')
const UserRepository = require('../repositories/user.repository')

async function signupUser(req, res, next) {
  const user = req.body
  const { error, value } = validate(UserSchema, user)

  if (error) {
    throw new AppError(BAD_REQUEST, error)
  }

  const data = await UserRepository.signupUser(value)
  if (data.error) {
    throw new AppError(BAD_REQUEST, data.error)
  }

  return res.send(data)
}

async function login(req, res, next) {
  const credentials = req.body
  const { error, value } = validate(LoginSchema, credentials)

  if (error) {
    throw new AppError(BAD_REQUEST, error)
  }

  const data = await UserRepository.login(value)
  if (data.error) {
    throw new AppError(BAD_REQUEST, data.error)
  }

  return res.send(data)
}

async function deleteUser(req, res, next) {
  const { userId } = req.user

  const data = await UserRepository.deleteUser(userId)
  return res.send(data)
}

module.exports = { signupUser, login, deleteUser }
