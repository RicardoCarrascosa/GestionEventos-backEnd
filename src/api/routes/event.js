const {
  getEvents,
  getEventsOrgUser,
  getEventByID,
  newEvent,
  updateEvent,
  verifyEvent,
  deleteEvent
} = require('../controllers/event')
const upload = require('../../middleware/file')

const { isAdmin, isOrg, isAuth } = require('../../middleware/auth.js')
const eventRoutes = require('express').Router()

eventRoutes.get('/', [], getEvents)
eventRoutes.get('/organized/:id', [isOrg], getEventsOrgUser)
eventRoutes.get('/:id', [isOrg], getEventByID)
eventRoutes.post(
  '/register',
  [isOrg, upload.fields([{ name: 'profileImage' }])],
  newEvent
)
eventRoutes.put('/:id', [isOrg], updateEvent)
eventRoutes.put('/verify/:id', [isAdmin], verifyEvent)
eventRoutes.delete('/:id', [isAdmin], deleteEvent)

module.exports = eventRoutes
