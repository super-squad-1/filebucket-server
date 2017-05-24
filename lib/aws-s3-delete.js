'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const awsDelete = function (pathname) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: pathname
  }

  return new Promise(function (resolve, reject) {
    s3.deleteObject(params, function (err, data) {
        // we are not going to error we can't delete the file
        resolve(data)
    })
  })
}

module.exports = awsDelete
