var _ = require("underscore");

var hasher = function(){
  var hash = [];
  for (var i = 0; i < 11; i++) {
    hash.push(String.fromCharCode(Math.floor(Math.random() * 255)));
  };
  return hash.join('');
}();


var hashMe = function(string) {
  if (typeof string === 'undefined') return;
  var hash_ret = [],
      hash_off = Math.floor(Math.random() * 11);
  for (var i = string.length - 1; i >= 0; i--) {
    hash_ret.push(String.fromCharCode(hasher.charCodeAt((i+hash_off)%11) + string.charCodeAt(i)));
  };
  return {
    'hash' : hash_ret.slice(0,10).join(''),
    'off' : hash_off
  }
};


var store = function () {
  var data = [];
 
  return {
    push: function(name, text){
      var hashObj = hashMe(text+" by "+name);
      var hash = hashObj.hash;
  	  data.push({
  	    "name": name,
  	    "text": text,
        "tweet_id": hash
  	  });
      console.log(data[data.length-1])
      // io.sockets.emit("new_tweet", { new_tweet : store.find({ name: name, text: text }) });
  	},
    list: function() {
    	return data;
    },
    find: function(properties) {
    	return _.where(data, properties);
    }
  };
}();

module.exports = store;

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
 
var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};
 
var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};
 
for(var i=0; i<10; i++) {
  store.push(getFakeName(), getFakeTweet());
}