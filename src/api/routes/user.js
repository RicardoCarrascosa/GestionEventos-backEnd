const { isOrg, isAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/file')
const validateUser = require('../validators/user')
const doValidation = require('../validators/validator')

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
  [upload.single('profileImage'), validateUser('registerUser'), doValidation],
  registerUser
)
userRoutes.post('/login', [validateUser('loginUser'), doValidation], logingUser)
userRoutes.get('/:id', [isOrg], getUsersByID)
userRoutes.put(
  '/:id',
  [isAdmin, validateUser('updateUser'), doValidation],
  updateUser
)
userRoutes.delete('/:id', [isAdmin], deleteUser)

module.exports = userRoutes
