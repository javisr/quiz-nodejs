var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/author', function(req, res) {
  console.log("ALEEERTA");
  res.render('author', {
    author: 'Javier',
    image: 'https://pbs.twimg.com/profile_images/447885469380919297/C3NpSfWl.jpeg'
  });
});

module.exports = router;