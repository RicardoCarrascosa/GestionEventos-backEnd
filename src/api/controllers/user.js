const { generateSign, verifyJWT } = require('../../config/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

// GET
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Error while getting a user',
          param: 'user'
        }
      ]
    })
  }
}
const getUsersByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await User.find({ _id: id })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Error while getting a user',
          param: 'user'
        }
      ]
    })
  }
}

// post
const registerUser = async (req, res, next) => {
  try {
    // Check for duplicates
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json({
        errors: [{ msg: 'User already Exists', path: 'user' }]
      })
    }
    const newUser = new User(req.body)

    if (req.files) {
      newUser.profileImage = req.files.profileImage[0].path
    }
    newUser.rol = 'user'

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Error While Creating a user',
          param: 'user'
        }
      ]
    })
  }
}
//Loging user
const logingUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'User or Password are incorrect',
            path: 'user'
          }
        ]
      })
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json({
        errors: [
          {
            msg: 'User or Password are incorrect',
            path: 'user'
          }
        ]
      })
    }
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'User or Password are incorrect',
          path: 'user'
        }
      ]
    })
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
    return res.status(400).json({
      errors: [
        {
          msg: 'Error Updating the user',
          path: 'user'
        }
      ]
    })
  }
}

// Delete
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const delUser = await User.findByIdAndDelete(id)

    // TODO when delete user delete also the asists he is in
    return res.status(200).json(delUser)
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Error Deleting a user',
          path: 'user'
        }
      ]
    })
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
