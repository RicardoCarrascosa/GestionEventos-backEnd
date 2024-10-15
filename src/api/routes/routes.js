const userRoutes = require('./user')
const asistRoutes = require('./asist')
const eventRoutes = require('./event')
const errorHandler = require('../../utils/errorHandler')

const allRoutes = (app) => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/events', eventRoutes)
  app.use('/api/v1/attendees', asistRoutes)

  app.use(errorHandler)
}
module.exports = allRoutes
