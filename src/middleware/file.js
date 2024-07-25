const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'EventOrg-Gallery',
    allowedFormats: ['jpg', 'png', 'gif', 'webp', 'jpeg']
  }
})

// const storage = new multer.memoryStorage()
const upload = multer({ storage })
module.exports = upload
