var express = require('express');
var router = express.Router();
var store = require("../store");
 
router.get('/:name', function(req, res) {
  var name = req.params.name;
  var list = store.find({name: name});
 
  res.render('index', { title: 'Twitter.js - Posts by '+name, tweets: list, show_form: true, name: name });
});

router.get('/', function(req, res) {
   res.redirect('/');
});
/* POST form submission */
router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
 
  store.push(name, text);
  io.sockets.emit("new_tweet", { new_tweet : store.find({ name: name, text: text }) });
});

module.exports = router;