const {
  getAsistants,
  getUserAsist,
  getEventAsist,
  createAsist,
  updateAsist,
  deleteUserAsist,
  deleteAsist
} = require('../controllers/asist')

const asistRoutes = require('express').Router()
const { isAdmin, isOrg, isAuth } = require('../../middleware/auth.js')

asistRoutes.get('/', [isAuth], getAsistants)
asistRoutes.get('/user/:id', [isAuth], getUserAsist)
asistRoutes.get('/event/:id', [isOrg], getEventAsist)
asistRoutes.post('/create', [isAuth], createAsist)
asistRoutes.put('/delete', [isAuth], deleteUserAsist)
asistRoutes.put('/:id', [isOrg], updateAsist)
asistRoutes.delete('/:id', [isAuth], deleteAsist)

module.exports = asistRoutes
