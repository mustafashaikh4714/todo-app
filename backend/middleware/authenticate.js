const { FORBIDDEN, UNAUTHORIZED } = require('../common/httpStatuses')
const AppError = require('../utils/AppError')
const Token = require('../utils/Token')

function authenticate(req, res, next) {
  const bearerToken = req.headers.authorization

  if (!bearerToken) {
    throw new AppError(FORBIDDEN, 'A Token is required for authentication.')
  }

  const token = bearerToken.split(' ')[1]

  try {
    const decodedToken = Token.verifyToken(token)

    req.user = decodedToken
    next()
  } catch (error) {
    throw new AppError(UNAUTHORIZED, 'Unauthorized user!')
  }
}

module.exports = authenticate
