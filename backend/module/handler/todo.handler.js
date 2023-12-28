const { BAD_REQUEST } = require('../../common/httpStatuses')
const { TodoSchema, UpdateTodoSchema } = require('../../schema/todo.schema')
const AppError = require('../../utils/AppError')
const { validate } = require('../../utils/validator')
const TodoRepository = require('../repositories/todo.repository')
const mongoose = require('mongoose')

async function createTodo(req, res, next) {
  const todo = req.body
  const { userId } = req.user
  const { error, value } = validate(TodoSchema, todo)

  if (error) {
    throw new AppError(BAD_REQUEST, error)
  }

  const data = await TodoRepository.createTodo({ ...value, userId })
  if (data.error) {
    throw new AppError(BAD_REQUEST, data.error)
  }
  return res.send(data)
}

async function updateTodo(req, res, next) {
  const todo = req.body
  const { id } = req.params

  const isValidId = mongoose.isValidObjectId(id)
  if (!isValidId) {
    throw new AppError(BAD_REQUEST, 'Invalid id.')
  }
  const { error, value } = validate(UpdateTodoSchema, todo)

  if (error) {
    throw new AppError(BAD_REQUEST, error)
  }

  const data = await TodoRepository.updateTodo(id, value)
  return res.send(data)
}

async function deleteTodo(req, res, next) {
  const { id } = req.params

  const isValidId = mongoose.isValidObjectId(id)
  if (!isValidId) {
    throw new AppError(BAD_REQUEST, 'Invalid id.')
  }

  const data = await TodoRepository.deleteTodo(id)
  return res.send(data)
}

async function getUserTodos(req, res, next) {
  const { userId } = req.user

  const data = await TodoRepository.getUserTodos(userId)
  return res.send(data)
}

module.exports = { createTodo, updateTodo, deleteTodo, getUserTodos }
