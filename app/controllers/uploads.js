'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Upload = models.upload;

const multer = require('multer')
const multerUpload = multer({ dest: '/tmp/' })

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const s3Upload = require('lib/aws-s3-upload')
const s3Delete = require('lib/aws-s3-delete')

const index = (req, res, next) => {
  console.log('I\'m getting in index.')
  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
    console.log('I\'m getting in show.')
  res.json({
    upload: req.upload.toJSON({ virtuals: true, user: req.user }),
  });
};

const create = (req, res, next) => {

  const file = {
    path: req.file.path,
    name: req.body.file.name,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype
  }

  s3Upload(file)
  .then((s3Response) => {
    return Upload.create({
      url: s3Response.Location,
      name: file.name,
      _owner: req.user._id,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype
    })
  })
  .then(() => res.sendStatus(200))
  .catch((error) => {console.error})


};

const update = (req, res, next) => {
    console.log('I\'m getting in update.')
  delete req.body._owner;  // disallow owner reassignment.
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  Upload.findOne( { _id: req.params.id, _owner: req.user._id } )
    .then(upload_rec => {
      if (!upload_rec) {
        return next()
      } else {
        // to get the file name, need to strip off the front
        // part of the url
        const URL = require('URL')
        const u = URL.parse(upload_rec.url)
        // this pathname will have a leading slash - remove that too
        const pathname = u.pathname.substr(1)
        s3Delete(pathname)
          .then(function() {
            return Upload.remove()
              .then(() => res.sendStatus(200))
              .catch(err => next(err))
          })
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
}


module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  {method: multerUpload.single('file[path]'), only: ['create'] },
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] },
], });
