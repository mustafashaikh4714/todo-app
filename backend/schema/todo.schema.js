const joi = require('joi')

const IdSchema = joi.string().hex().length(24).required()

const TodoSchema = joi.object({
  title: joi.string().required()
})

const UpdateTodoSchema = joi.object({
  title: joi.string(),
  isCompleted: joi.boolean()
})

module.exports = {
  IdSchema,
  TodoSchema,
  UpdateTodoSchema
}
