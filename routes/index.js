var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorfy Me' });
});

/* GET main application page. */
router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Colorfy Me', layout: 'app-layout' });
});

/* GET setup page. */
router.get('/setup', function(req, res, next) {
  res.render('partials/setup', { title: 'Colorfy Me', layout: 'app-layout' });
});

module.exports = router;
