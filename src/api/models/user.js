const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true },
    birthday: { type: Date },
    profileImage: { type: String }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    const toAPI = ret
    delete toAPI.password // dont send password to API

    return toAPI
  }
})
const User = mongoose.model('users', userSchema, 'users')

module.exports = User
