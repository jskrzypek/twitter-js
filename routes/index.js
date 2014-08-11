var express = require('express');
var router = express.Router();
var store = require('../store');


/* GET home page. */
router.get('/', function(req, res) {
	var tweets = store.list();
	res.render('index', { title: 'Twitter.js', tweets: tweets, show_form: true });
});

/* POST form submission */
router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
 
  store.push(name, text);
  io.sockets.emit("new_tweet", store.find({ name: name, text: text }) );
});

module.exports = router;