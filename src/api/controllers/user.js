const { generateSign, verifyJWT } = require('../../config/jwt')
const { deleteFile } = require('../../utils/deleteFile')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// GET
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json({
      status: 'success',
      message: 'User Obtained',
      users
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error getting the Users'
    return next(error) // Forward the error to the error handler
  }
}
const getUsersByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await User.find({ _id: id })
    return res.status(200).json({
      status: 'success',
      message: 'User Obtained',
      users
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error getting a User'
    return next(error) // Forward the error to the error handler
  }
}

// post
const registerUser = async (req, res, next) => {
  try {
    // Check for duplicates
    if (await User.findOne({ email: req.body.email })) {
      const error = new Error('User already exists')
      error.statusCode = 400
      return next(error) // Forward the error to the error handler
    }

    const newUser = new User(req.body)

    if (req.files) {
      newUser.profileImage = req.files.profileImage[0].path
    }
    newUser.rol = 'user'

    const userSaved = await newUser.save()
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      userSaved
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error while Creating a user'
    next(error)
  }
}
//Loging user
const logingUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      error.status = 'error'
      error.statusCode = 400
      error.message = 'User or password are Incorrect'
      return next(error) // Forward the error to the error handler
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({
        status: 'success',
        message: 'User registered successfully',
        user,
        token
      })
    } else {
      error.status = 'error'
      error.statusCode = 400
      error.message = 'User or password are Incorrect'
      return next(error) // Forward the error to the error handler
    }
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'User or password are Incorrect'
    return next(error) // Forward the error to the error handler
  }
}
// Put / Update
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new User(req.body)
    //Update Images in case
    if (req.files) {
      const oldUser = await User.findById(id)
      newUser.profileImage = req.files[0].path
      deleteFile(oldUser.profileImage)
    }
    newUser._id = id
    const updateUser = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json({
      status: 'success',
      message: 'User Updated',
      updateUser
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error Updating the user'
    return next(error) // Forward the error to the error handler
  }
}

// Delete
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const delUser = await User.findByIdAndDelete(id)
    if (delUser.profileImage) {
      deleteFile(delUser.profileImage)
    }

    return res.status(200).json({
      status: 'success',
      message: 'User Deleted',
      delUser
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error deleting the user'
    return next(error) // Forward the error to the error handler
  }
}

module.exports = {
  getUsers,
  getUsersByID,
  logingUser,
  registerUser,
  updateUser,
  deleteUser
}
