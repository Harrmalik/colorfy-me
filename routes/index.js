var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorfy Me' });
});

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Colorfy Me' });
});

module.exports = router;
