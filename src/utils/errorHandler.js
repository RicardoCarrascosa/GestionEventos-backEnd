// errorHandler.js
// const log = require('log') // A logging library like 'winston' can be used
const { deleteFile } = require('../utils/deleteFile')

const errorHandler = (err, req, res, next) => {
  // log.error(err.stack) // Log the error for debugging purposes

  // First delete already uploaded cloudinary
  if (req.files) {
    const filesToDelete = Object.keys(req.files)
    filesToDelete.forEach((key) => {
      req.files[key].forEach((file) => {
        deleteFile(file.path)
      })
    })
  }

  const statusCode = err.statusCode || 500 // Default to 500 for server errors
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    details: err.details || ''
  })
}

module.exports = errorHandler
