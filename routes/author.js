var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('author', {
    author: 'Javier',
    image: 'https://pbs.twimg.com/profile_images/447885469380919297/C3NpSfWl.jpeg',
    errors: []
  });
});

module.exports = router;
