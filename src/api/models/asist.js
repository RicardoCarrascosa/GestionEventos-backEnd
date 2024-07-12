const mongoose = require('mongoose')

const asistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    events: [{ type: mongoose.Types.ObjectId, ref: 'events', required: true }]
  },
  {
    timestamps: true,
    collection: 'asists'
  }
)

const Asist = mongoose.model('asists', asistSchema, 'asists')

module.exports = Asist
