function validate(schema, object) {
  // const { error, value } = schema.validate(object)
  // return { error: error?.details[0]?.message, value }
  return schema.validate(object)
}
module.exports = { validate }
