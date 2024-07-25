async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  })
  return res
}

const uploadBuffer = async (req, res) => {
  console.log(req)
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64
    const cldRes = await handleUpload(dataURI)
    res.json(cldRes)
  } catch (error) {
    console.log(error)
    // res.send({
    //   message: error.message
    // })
  }
}

module.exports = uploadBuffer
