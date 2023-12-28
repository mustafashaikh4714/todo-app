const Todo = require('../../models/Todo.model')

async function isTodoExist(title) {
  const todo = await Todo.findOne({ title })
  return todo ? true : false
}
async function createTodo(_todo) {
  const isExists = await isTodoExist(_todo.title)
  if (isExists) {
    return { error: 'todo already exists!' }
  }
  const todo = await Todo.create(_todo)
  return { todo }
}

async function updateTodo(id, _todo) {
  const todo = await Todo.findByIdAndUpdate(id, { $set: _todo }, { new: true })
  return { todo }
}

async function deleteTodo(id) {
  const todo = await Todo.findByIdAndRemove(id)
  return { todo }
}

async function getUserTodos(id) {
  const todos = await Todo.find({ userId: id })
  return { todos }
}

module.exports = { createTodo, updateTodo, deleteTodo, getUserTodos }
