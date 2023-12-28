const jwt = require('jsonwebtoken')
class Token {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })
  }
  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET)
  }
}

module.exports = Token
