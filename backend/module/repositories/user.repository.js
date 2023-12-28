const User = require('../../models/User.model')
const Password = require('../../utils/Password')
const Token = require('../../utils/Token')

async function isUserExist(email, username) {
  const user = await User.findOne({ $or: [{ email }, { username }] })
  return user ? true : false
}

async function signupUser(user) {
  let isUser = await isUserExist(user.email, user.username)

  if (isUser) {
    return { error: 'User Already Exists!' }
  }

  let newUser = await User.create(user)

  let { email, _id } = newUser
  let token = Token.generateToken({ email, userId: _id })

  return { message: 'Signup successful!', data: { user: newUser, token } }
}

async function login(credentials) {
  const { username, password } = credentials

  let user = null
  if (username.includes('@')) {
    user = await User.findOne({ email: username })
  } else {
    user = await User.findOne({ username })
  }

  if (user && Password.compare(user.password, password)) {
    let { email, _id } = user
    let token = Token.generateToken({ email, userId: _id })

    return { message: 'Login successful!', data: { user, token } }
  } else {
    return { error: 'username or password is incorrect' }
  }
}

async function deleteUser(id) {
  console.log('id', id)
  const data = await User.findByIdAndRemove(id)
  return { data }
}

module.exports = { signupUser, login, deleteUser }
