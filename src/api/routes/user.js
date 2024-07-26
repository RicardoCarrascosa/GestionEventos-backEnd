const { isOrg, isAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/file')

const {
  getUsers,
  getUsersByID,
  logingUser,
  registerUser,
  updateUser,
  deleteUser
} = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.get('/', [isOrg], getUsers)
userRoutes.post(
  '/register',
  [upload.fields([{ name: 'profileImage' }])],
  registerUser
)
userRoutes.post('/login', [], logingUser)
userRoutes.get('/:id', [isOrg], getUsersByID)
userRoutes.put('/:id', [isAdmin], updateUser)
userRoutes.delete('/:id', [isAdmin], deleteUser)

module.exports = userRoutes
