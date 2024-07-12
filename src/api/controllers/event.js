const Event = require('../models/event')

// GET
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizer')
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(['Error getting all events', error])
  }
}
const getEventsOrgUser = async (req, res, next) => {
  try {
    const user = req.params
    const events = await Event.find({ organizer: user.id }).populate(
      'organizer'
    )
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(['Error getting all events', error])
  }
}
const getEventByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const events = await Event.find({ _id: id }).populate('organizer')
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a Event', error])
  }
}

// post
const newEvent = async (req, res, next) => {
  try {
    // Check for duplicates
    if (await Event.findOne({ name: req.body.name })) {
      return res.status(400).json(['Event already Exists', req.body])
    }
    const newEvent = new Event(req.body)
    if (req.files) {
      newEvent.eventImage = req.files.eventImage[0].path
    }
    newEvent.verified = false

    const eventSaved = await newEvent.save()
    return res.status(201).json(eventSaved)
  } catch (error) {
    return res.status(400).json(['Error While Creating an event', error])
  }
}

// Put / Update
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params

    // Event can only be checked by admin and correct function
    if ('verified' in req.body) {
      delete req.body.verified
    }
    const newEvent = new Event(req.body)
    newEvent._id = id
    const updateEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true
    })
    return res.status(200).json(updateEvent)
  } catch (error) {
    return res.status(400).json(['Error Updating a Event', error])
  }
}

const verifyEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const newEvent = new Event({ verified: true })

    newEvent._id = id
    const updateEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true
    })
    return res.status(200).json(updateEvent)
  } catch (error) {
    return res.status(400).json(['Error Updating a Event', error])
  }
}

// Delete
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const delEvent = await Event.findByIdAndDelete(id)
    return res.status(200).json(delEvent)
  } catch (error) {
    return res.status(400).json(['Error while DELETING a Event', error])
  }
}

module.exports = {
  getEvents,
  getEventsOrgUser,
  getEventByID,
  newEvent,
  updateEvent,
  verifyEvent,
  deleteEvent
}
