const jwt = require('jsonwebtoken')

// Create Key
const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1w' })
}

//checks the key
const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateSign, verifyJWT }
