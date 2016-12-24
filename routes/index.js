var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colorfy Me', layout: 'layouts/layout' });
});

/* GET main application page. */
router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Colorfy Me - Application', layout: 'layouts/app-layout' });
});

/* GET setup page. */
router.get('/setup', function(req, res, next) {
  res.render('partials/setup', { title: 'Colorfy Me - Setup', layout: 'layouts/app-layout' });
});

module.exports = router;
