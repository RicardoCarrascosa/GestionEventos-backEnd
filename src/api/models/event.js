const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'Networking',
        'Training',
        'WorkShop',
        'Festival',
        'Retreats',
        'Expos',
        'Turnament',
        'AfterWork',
        'Convention',
        'Congress'
      ]
    },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    organizer: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    eventImage: { type: String },
    verified: { type: Boolean, required: true }
  },
  {
    timestamps: true,
    collection: 'events'
  }
)

const Event = mongoose.model('events', eventSchema, 'events')

module.exports = Event
