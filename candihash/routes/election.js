var express = require('express');
var router = express.Router();
var md5 = require('md5');


//post a guid, and get back the data for a card
//this card will be cached in mongo
//and when the card data is stored, the card is returned to the user.



/* create matric, add, return json to the user */
router.get('/candidate/', function (req, res, next) {

  //need to do the mapping one time someplace else
  var choices = {
    "01": "Deal 1: Get an autographed print for free if this card is Ace of Hearts Bay Minette Alabama!",
    "02": "Deal 2: Get an autographed print for free if this card is King of Hearts Bay Minette Alabama!",
    "03": "Deal 3: Get an autographed print for free if this card is Ace of Diamonds Bay Minette Alabama!",
    "04": "Deal 4: Get an autographed print for free if this card is King of Diamonds Bay Minette Alabama!",
  }


  var matric = req.query.matric_value;
  var ballot = [];


  var valid = {
    "hash": md5(matric)
  };

  //ballot.push(valid);
  var i = 0;

  /*
  this loop will iterate over the original hash that was passed in
  2 chars at a time and search for 4 candidates. if 4 are not found in one guid
  rehash the guid and start at the beginning again.  repeat until there are 4 candidates
  */

  var selectedCandidates = {}; //declaring this variable to be able to only add unique candidates to the candidates array



  //iterating through a hash 2 hex chars at a time
  for (i = i; i < 31; i++) {
    if (Object.keys(ballot).length == 1) break;
    searchKey = matric.substr(i, 2);
    if (choices.hasOwnProperty(searchKey)) {
      var candName = choices[searchKey];
      var candKey = candName.replace(/ +/g, "");
      var candObj = {
        name: choices[searchKey],
        key: candKey,
        image: candKey + ".jpg"
      }
    }
  }

  res.json(candObj);

});

module.exports = router;
