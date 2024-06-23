var express = require('express');
const { route } = require('./app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the backend!')
});

router.get('/posts', function(req, res, next) {
  res.json('This is a post')
});

module.exports = router;
