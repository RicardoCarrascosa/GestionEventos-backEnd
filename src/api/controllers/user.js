const { generateSign, verifyJWT } = require('../../config/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// GET
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(['Error getting all users', error])
  }
}
const getUsersByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await User.find({ _id: id })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a User', error])
  }
}

// post
const registerUser = async (req, res, next) => {
  try {
    // Check for duplicates

    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json(['User already Exists', req.body])
    }
    const newUser = new User(req.body)

    if (req.files) {
      newUser.profileImage = req.files.profileImage[0].path
    }
    newUser.rol = 'user'

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json(['Error While Creating a user', error])
  }
}
//Loging user
const logingUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json('User or password are incorrect')
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('User or password are incorrect')
    }
  } catch (error) {
    return res.status(400).json(['Error while Login a User', error])
  }
}
// Put / Update
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new User(req.body)

    newUser._id = id
    const updateUser = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(updateUser)
  } catch (error) {
    return res.status(400).json(['Error Updating a user', error])
  }
}

// Delete
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const delUser = await User.findByIdAndDelete(id)

    // TOOD when delete user delete also the asists he is in
    // TODOOOOOO tODOOOOO
    return res.status(200).json(delUser)
  } catch (error) {
    return res.status(400).json(['Error while DELETING a User', error])
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
