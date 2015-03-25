var express = require('express');
var router = express.Router();

// HOME
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// APP
router.get('/app', function(req, res) {
  res.render('app', { title: 'Express' });
});

module.exports = router;
