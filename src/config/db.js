const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to DB')
  } catch {
    console.log('Error Connecting to DB')
  }
}

module.exports = connectDB
