const { validationResult } = require('express-validator')

const doValidation = function (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed')
    error.statusCode = 422
    error.details = errors.array() // Attach validation errors
    return next(error) // Forward the error to the error handler
  }
  next() // No errors, move to the next middleware or controller
}
module.exports = doValidation
