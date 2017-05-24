'use strict';

const controller = require('lib/wiring/controller');

/* GET home page. */
const root = (req, res) => {
  res.json({
    index: {
      title: 'File Bucket',
      environment: req.app.get('env'),
    },
  });
};

module.exports = controller({
  root,
});
