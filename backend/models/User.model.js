const mongoose = require('mongoose')
const cleanDoc = require('../utils/cleanDoc')
const Password = require('../utils/Password')
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String },
    password: { type: String }
  },
  { toJSON: cleanDoc(), timestamps: true }
)

UserSchema.set('lean', true)

UserSchema.pre('save', function (next) {
  const hashed = Password.toHash(this.get('password'))
  this.set('password', hashed)
  next()
})

const User = mongoose.model('user', UserSchema)

module.exports = User
