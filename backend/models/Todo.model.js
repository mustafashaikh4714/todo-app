const mongoose = require('mongoose')
const cleanDoc = require('../utils/cleanDoc')
const { Schema } = mongoose

const TodoSchema = new Schema(
  {
    title: { type: String, unique: true },
    isCompleted: { type: String, default: false },
    userId: { type: mongoose.Schema.ObjectId, ref: 'user' }
  },
  { toJSON: cleanDoc(), timestamps: true }
)

TodoSchema.set('lean', true)

const Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo
