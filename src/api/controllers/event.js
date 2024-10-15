const Event = require('../models/event')

// GET
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizer')
    return res.status(200).json({
      status: 'success',
      message: 'Event Obtained',
      events
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error getting the Events'
    return next(error)
  }
}
const getEventsOrgUser = async (req, res, next) => {
  try {
    const user = req.params
    const events = await Event.find({ organizer: user.id }).populate(
      'organizer'
    )
    return res.status(200).json({
      status: 'success',
      message: 'Event Obtained',
      events
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error getting the Events'
    return next(error)
  }
}
const getEventByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const events = await Event.find({ _id: id }).populate('organizer')
    return res.status(200).json({
      status: 'success',
      message: 'Event Obtained',
      events
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error getting the Events'
    return next(error)
  }
}

// post
const newEvent = async (req, res, next) => {
  try {
    // Check for duplicates
    if (await Event.findOne({ name: req.body.name })) {
      const error = new Error('Event already exists')
      error.statusCode = 400
      return next(error)
    }
    const newEvent = new Event(req.body)
    if (req.files) {
      newEvent.eventImage = req.files.eventImage[0].path
    }
    newEvent.verified = false

    const eventSaved = await newEvent.save()
    return res.status(201).json({
      status: 'success',
      message: 'Event Saved',
      eventSaved
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error Creating the Event'
    return next(error)
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
    return res.status(200).json({
      status: 'success',
      message: 'Event Updated',
      updateEvent
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error updating the Event'
    return next(error)
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
    return res.status(200).json({
      status: 'success',
      message: 'Event Verified',
      updateEvent
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error updating the Event'
    return next(error)
  }
}

// Delete
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const delEvent = await Event.findByIdAndDelete(id)
    return res.status(200).json({
      status: 'success',
      message: 'Event Deleted',
      delEvent
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error deleting the Event'
    return next(error)
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
