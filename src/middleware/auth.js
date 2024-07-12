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
    return res.status(400).json(['Error in Authorization', error])
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
      return res.status(400).json('Do Not have permision')
    }
  } catch (error) {
    return res.status(400).json(['Error in Authorization', error])
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
      return res.status(400).json('Do Not have permision')
    }
  } catch (error) {
    return res.status(400).json(['Error in Authorization', error])
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
