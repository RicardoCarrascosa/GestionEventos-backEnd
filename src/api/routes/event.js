const {
  getEvents,
  getEventsOrgUser,
  getEventByID,
  newEvent,
  updateEvent,
  verifyEvent,
  deleteEvent
} = require('../controllers/event')

// Load the middlewares
const upload = require('../../middleware/file')
const { isAdmin, isOrg, isAuth } = require('../../middleware/auth.js')
const validateEvent = require('../validators/event.js')
const doValidation = require('../validators/validator.js')

const eventRoutes = require('express').Router()

eventRoutes.get('/', [], getEvents)
eventRoutes.get('/organized/:id', [isOrg], getEventsOrgUser)
eventRoutes.get('/:id', [isOrg], getEventByID)
eventRoutes.post(
  '/register',
  [
    isOrg,
    upload.fields([{ name: 'eventImage' }]),
    validateEvent('createEvent'),
    doValidation
  ],
  newEvent
)
eventRoutes.put('/:id', [isOrg, validateEvent('updateEvent')], updateEvent)
eventRoutes.put(
  '/verify/:id',
  [isAdmin, validateEvent('updateEvent')],
  verifyEvent
)
eventRoutes.delete('/:id', [isAdmin], deleteEvent)

module.exports = eventRoutes
