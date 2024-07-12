const Asist = require('../models/asist')

// Get All
const getAsistants = async (req, res, next) => {
  try {
    const asistats = await Asist.find().populate('user events')
    return res.status(200).json(asistats)
  } catch (error) {
    return res.status(400).json(['Error getting all Assistant', error])
  }
}

const getUserAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    const asistats = await Asist.findOne({ user: id }).populate('user events')
    return res.status(200).json(asistats)
  } catch (error) {
    return res.status(400).json(['Error getting all Assistant', error])
  }
}
const getEventAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    const asistats = await Asist.find({ events: id }).populate('user events')
    return res.status(200).json(asistats)
  } catch (error) {
    return res.status(400).json(['Error getting all Assistant', error])
  }
}
// Create
const createAsist = async (req, res, next) => {
  try {
    console.log(req.body)
    if (await Asist.findOne({ user: req.body.user, events: req.body.events })) {
      return res.status(400).json(['User already has this event', req.body])
    } else if (await Asist.findOne({ user: req.body.user })) {
      // User Asist already exists, just needs to update the Events he is going
      const { id } = await Asist.findOne({ user: req.body.user })
      console.log(id)
      const updateAsist = await Asist.findByIdAndUpdate(
        id,
        { $push: { events: req.body.events } },
        { new: true }
      )
      return res.status(200).json(updateAsist)
    }
    const newAsist = new Asist(req.body)
    console.log(newAsist)
    const asistSaved = await newAsist.save()
    console.log('AsistSaved')
    return res.status(201).json(asistSaved)
  } catch (error) {
    console.log('AsistError: ', error)
    return ['Error Asining an Asistant', error]
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
    return res.status(200).json(updateAsist)
  } catch (error) {
    return res.status(400).json(['Error Updating the Asist', error])
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
    return res.status(200).json(updateAsist)
  } catch {
    return res.status(400).json('Error')
  }
}
// Delete

const deleteAsist = async (req, res, next) => {
  try {
    const { id } = req.params
    const delAsist = await Asist.findByIdAndDelete(id)
    return res.status(200).json(delAsist)
  } catch (error) {
    return res.status(400).json(['Error while DELETING a Asist', error])
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
