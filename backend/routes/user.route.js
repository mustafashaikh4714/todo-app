const authenticate = require('../middleware/authenticate')
const { signupUser, login, deleteUser } = require('../module/handler/user.handler')
const { tryCatch } = require('../utils/tryCatch')

module.exports = (app) => {
  app.post('/api/user/signup', tryCatch(signupUser))
  app.post('/api/user/login', tryCatch(login))
  app.delete('/api/user/', authenticate, tryCatch(deleteUser))
}
