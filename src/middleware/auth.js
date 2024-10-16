const User = require('../api/models/user.js')
const { verifyJWT } = require('../config/jwt.js')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('Not Authorized')
    }
    const user = getUserForAuth(token)
    req.user = user
    next()
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error In Authorization'
    return next(error)
  }
}

const isOrg = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(400).json('Not Authorized')
    }
    const user = await getUserForAuth(token)
    if (user.rol === 'org' || user.rol === 'admin') {
      req.user = user
      next()
    } else {
      const error = new Error('Not Authorized')
      error.status = 'error'
      error.statusCode = 400
      return next(error)
    }
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error In Authorization'
    return next(error)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(400).json('Not Authorized')
    }
    const user = await getUserForAuth(token)
    if (user.rol === 'admin') {
      req.user = user
      next()
    } else {
      const error = new Error('Not Authorized')
      error.status = 'error'
      error.statusCode = 400
      return next(error)
    }
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error in Authorization'
    return next(error)
  }
}

const getUserForAuth = async (token) => {
  const parsedToken = token.replace('Bearer ', '')
  const { id } = verifyJWT(parsedToken)
  const user = await User.findById(id)
  user.pasword = null
  return user
}

module.exports = { isAdmin, isAuth, isOrg }
