var express = require('express');
var router = express.Router();
var md5 = require('md5');


//post a guid, and get back the data for a card
//this card will be cached in mongo
//and when the card data is stored, the card is returned to the user.


/* create matric, add, return json to the user */
router.post('/add', function(req, res, next) {
  
  var suits = {
    "0": "spade",
    "1": "club",
    "2": "diamond",
    "3": "heart",
    "4": "spade",
    "5": "club",
    "6": "diamond",
    "7": "heart",
    "8": "spade",
    "9": "club",
    "a": "diamond",
    "b": "heart",
    "c": "spade",
    "d": "club",
    "e": "diamond",
    "f": "heart"
  }

  var hash = md5(req.body.matric_value);
  var searchNum = hash.substr(0,1)
  var suit = suits[searchNum];
  var card = {
    "suit" : suit
  }
  
  res.send(card);

});

module.exports = router;
