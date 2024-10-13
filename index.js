require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cloudinary = require('cloudinary').v2

const connectDB = require('./src/config/db.js')
const allRoutes = require('./src/api/routes/routes')

// Empiezo el servidor
const app = express()
app.use(cors())

app.use(express.json())
// Arranco la Base de datos
connectDB()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
allRoutes(app)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server Deployed: http://localhost:3000')
})
