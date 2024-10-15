const Asist = require('../models/asist')

// Get All
const getAsistants = async (req, res, next) => {
  try {
    const asistats = await Asist.find().populate('user events')
    return res.status(200).json({
      status: 'success',
      message: 'Asistants Obtained',
      asistats
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error optaining an asistance'
    return next(error)
  }
}

const getUserAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    const asistats = await Asist.findOne({ user: id }).populate('user events')
    return res.status(200).json({
      status: 'success',
      message: 'Asistants Obtained',
      asistats
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error optaining an asistance'
    return next(error)
  }
}
const getEventAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    const asistats = await Asist.find({ events: id }).populate('user events')
    return res.status(200).json({
      status: 'success',
      message: 'Asistants Obtained',
      asistats
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error optaining an asistance'
    return next(error)
  }
}
// Create
const createAsist = async (req, res, next) => {
  try {
    console.log(req.body)
    if (await Asist.findOne({ user: req.body.user, events: req.body.events })) {
      const error = new Error('User already has this event')
      error.statusCode = 400
      return next(error) // Forward the error to the error handler
    } else if (await Asist.findOne({ user: req.body.user })) {
      // User Asist already exists, just needs to update the Events he is going
      const { id } = await Asist.findOne({ user: req.body.user })
      console.log(id)
      const updateAsist = await Asist.findByIdAndUpdate(
        id,
        { $push: { events: req.body.events } },
        { new: true }
      )
      return res.status(200).json({
        status: 'success',
        message: 'Asistants updated',
        updateAsist
      })
    }
    const newAsist = new Asist(req.body)
    console.log(newAsist)
    const asistSaved = await newAsist.save()
    return res.status(201).json({
      status: 'success',
      message: 'Asistants created',
      asistSaved
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error asigning an asistance'
    return next(error)
  }
}

// PUT / updata

const updateAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    if (await Asist.findOne({ user: req.body.user })) {
      // User Asist already exists, just needs to update the Events he is going
      const { id, events } = await Asist.findOne({ user: req.body.user })
      if (typeof (events.toString() == 'String')) {
        ev = [events]
        req.body.events.push(ev)
      } else {
        req.body.events.push(events.toString())
      }
    }
    const newAsist = new Asist(req.body)

    newAsist._id = id
    const updateAsist = await Asist.findByIdAndUpdate(id, newAsist, {
      new: true
    })
    return res.status(200).json({
      status: 'success',
      message: 'Asistants updated',
      updateAsist
    })
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error updating an asistance'
    return next(error)
  }
}

const deleteUserAsist = async (req, res, next) => {
  try {
    console.log(req.body)
    const { id } = await Asist.findOne({ user: req.body.user })
    const updateAsist = await Asist.findByIdAndUpdate(
      id,
      { $pull: { events: req.body.events } },
      { new: true }
    )
    return res.status(200).json({
      status: 'success',
      message: 'Asistants deleted',
      updateAsist
    })
  } catch {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error updating an asistance'
    return next(error) // Forward the error to the error handler
  }
}
// Delete

const deleteAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    const delAsist = await Asist.findByIdAndDelete(id)
    return res.status(200).json(delAsist)
  } catch (error) {
    error.status = 'error'
    error.statusCode = 400
    error.message = 'Error deletening an asistance'
    return next(error) // Forward the error to the error handler
  }
}

module.exports = {
  getAsistants,
  getUserAsist,
  getEventAsist,
  createAsist,
  updateAsist,
  deleteUserAsist,
  deleteAsist
}
