const userRoutes = require('./user')
const asistRoutes = require('./asist')
const eventRoutes = require('./event')

const allRoutes = (app) => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/events', eventRoutes)
  app.use('/api/v1/attendees', asistRoutes)
}
module.exports = allRoutes
