'use strict'

// NODE_PATH=. node bin/aws-s3-upload.js images/padawan.png title

require('dotenv').config()

const s3Upload = require('lib/aws-s3-upload')

const mime = require('mime')

const mongoose = require('app/middleware/mongoose')
const Upload = require('app/models/upload')

const file = {
  path: process.argv[2],
  name: process.argv[3] || 'default',
  mimetype: mime.lookup(process.argv[2]),
  originalname: process.argv[2]
}

s3Upload(file)
  .then((awsResponse) => {
    return Upload.create({
      url: awsResponse.Location,
      name: file.name
    })
  })
  .then((data) => console.log('data is: ', data))
  .catch((error) => console.error('error is: ', error))
  .then(() => mongoose.connection.close())
