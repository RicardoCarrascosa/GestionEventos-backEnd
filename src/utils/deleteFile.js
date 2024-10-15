const cloudinary = require('cloudinary').v2

const deleteFile = (imgUrl) => {
  if (imgUrl) {
    const imgSplited = imgUrl.split('/')
    const folderName = imgSplited.at(-2)
    const fieldName = imgSplited.at(-1).split('.')
    const public_id = `${folderName}/${fieldName[0]}`
    cloudinary.uploader.destroy(public_id, () => {
      console.log(`Imagen Borrada de Cloudinary: ${public_id}`)
    })
  } else {
    console.log('No image to delete')
  }
}

module.exports = { deleteFile }
