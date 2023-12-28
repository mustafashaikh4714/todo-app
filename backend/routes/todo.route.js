const authenticate = require('../middleware/authenticate')
const { createTodo, updateTodo, deleteTodo, getUserTodos } = require('../module/handler/todo.handler')
const { tryCatch } = require('../utils/tryCatch')

module.exports = (app) => {
  app.post('/api/todos', authenticate, tryCatch(createTodo))
  app.patch('/api/todos/:id', authenticate, tryCatch(updateTodo))
  app.delete('/api/todos/:id', authenticate, tryCatch(deleteTodo))
  app.get('/api/todos', authenticate, tryCatch(getUserTodos))
}
