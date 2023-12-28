exports.tryCatch = (controller) => (req, res, next) => {
  return Promise.resolve(controller(req, res, next)).catch(next)
}
