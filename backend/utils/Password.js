const { scryptSync, randomBytes } = require('crypto')

class Password {
  static toHash(password) {
    const salt = randomBytes(8).toString('hex')
    const buffer = scryptSync(password, salt, 64)

    return `${buffer.toString('hex')}.${salt}`
  }

  static compare(storedPassword, suppliedPassword) {
    const [hash, salt] = storedPassword.split('.')

    const buffer = scryptSync(suppliedPassword, salt, 64)
    return buffer.toString('hex') === hash
  }
}

module.exports = Password
