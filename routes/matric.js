var express = require('express');
var router = express.Router();
var md5 = require('md5');
const axios = require('axios')


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

  var numbers = {
    "0": "2",
    "1": "3",
    "2": "4",
    "3": "5",
    "4": "6",
    "5": "7",
    "6": "8",
    "7": "9",
    "8": "10",
    "9": "J",
    "a": "Q",
    "b": "K",
    "c": "A",
    "d": "2",
    "e": "7",
    "f": "A"
  }



  //build hashchain
  var cards = {};
  var hash  = md5(req.body.matric_value);
  var hash2 = md5(hash);
  var hash3 = md5(hash2);
  var hash4 = md5(hash3);


  var searchSuite = hash.substr(0,1);
  var searchNum = hash.substr(-1);;

  var suit = suits[searchSuite];
  var number = numbers[searchNum];

  var card1 = {
    "suit" : suit,
    "number": number
  };


  var searchSuite2 = hash2.substr(0,1);
  var searchNum2 = hash2.substr(-1);;

  var suit2 = suits[searchSuite2];
  var number2 = numbers[searchNum2];

  var card2 = {
    "suit" : suit2,
    "number": number2
  };

  var searchSuite3 = hash3.substr(0,1);
  var searchNum3 = hash3.substr(-1);;

  var suit3 = suits[searchSuite3];
  var number3 = numbers[searchNum3];

  var card3 = {
    "suit" : suit3,
    "number": number3
  };

  var searchSuite4 = hash4.substr(0,1);
  var searchNum4 = hash4.substr(-1);;

  var suit4 = suits[searchSuite4];
  var number4 = numbers[searchNum4];

  var card4 = {
    "suit" : suit4,
    "number": number4
  };



  axios.get('http://localhost:3000/candidates/election?matric_value='+hash)
  .then(elec => {
    card1.election = elec.data;

    axios.get('http://localhost:3000/candidates/election?matric_value='+hash2)
    .then(elec => {
      card2.election = elec.data;

      axios.get('http://localhost:3000/candidates/election?matric_value='+hash3)
      .then(elec => {
        card3.election = elec.data;

        axios.get('http://localhost:3000/candidates/election?matric_value='+hash4)
        .then(elec => {
          card4.election = elec.data;
          cards.card1 = card1;
          cards.card2 = card2;
          cards.card3 = card3;
          cards.card4 = card4;

          res.json(cards);
        })

      })
    });

  });
  








});

module.exports = router;
