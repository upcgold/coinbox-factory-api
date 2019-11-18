var express = require('express');
var router = express.Router();
var md5 = require('md5');
const axios = require('axios')
var zipcodes = require('zipcodes');

//post a guid, and get back the data for a card
//this card will be cached in mongo
//and when the card data is stored, the card is returned to the user.

function extractZip(zipFull1)
{
  location1Valid = false;
  while(!location1Valid)
  {
    for(i=0;i<zipFull1.length-5;i++)
    {
      var location1 = zipcodes.lookup(zipFull1.substr(i,5));
      if(location1)
      {
        location1Valid = true;
        break;
      }
      console.log("trying " + zipFull1.substr(i,5));
    }
    if(!location1)
    {
      hash = md5(zipFull1);
      console.log("rehashing " + zipFull1);
      zipFull1 = hash.replace(/\D/g,'');
      console.log(" for " + zipFull1);
    }
  }
  return location1;
}



/* create matric, add, return json to the user */
router.get('/scan/', function(req, res, next) {

  var suits = {
    "0": "S",
    "1": "C",
    "2": "D",
    "3": "H",
    "4": "S",
    "5": "C",
    "6": "D",
    "7": "H",
    "8": "S",
    "9": "C",
    "a": "D",
    "b": "H",
    "c": "S",
    "d": "C",
    "e": "D",
    "f": "H"
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


  const salt = "777222RAVEN222777";

  //build hashchain
  var cards = {};
  var hash  = md5(salt + req.query.matric_value + salt);

  zipFull1 = hash.replace(/\D/g,'');
  location1 = extractZip(zipFull1);
  //zipFull1 = "000000000";  uncomment for testing to make sure that invalid zip string is rehashed


  var hash2 = md5(hash+salt);
  zipFull2 = hash2.replace(/\D/g,'');
  location2 = extractZip(zipFull2);


  var hash3 = md5(hash2+salt);
  zipFull3 = hash3.replace(/\D/g,'');
  location3 = extractZip(zipFull3);



  var hash4 = md5(hash3+salt);
  zipFull4 = hash4.replace(/\D/g,'');
  location4 = extractZip(zipFull4);


  var searchSuite = hash.substr(0,1);
  var searchNum = hash.substr(-1);;

  var suit = suits[searchSuite];
  var number = numbers[searchNum];


  var card1 = {
    "hash": hash,
    "suit" : suit,
    "number": number,
    "city": location1.city,
    "state": location1.state,
    "zip":  location1.zip,
  };


  var searchSuite2 = hash2.substr(0,1);
  var searchNum2 = hash2.substr(-1);;

  var suit2 = suits[searchSuite2];
  var number2 = numbers[searchNum2];

  var card2 = {
    "hash": hash2,
    "suit" : suit2,
    "number": number2,
    "city": location2.city,
    "state": location2.state,
    "zip":  location2.zip,
  };


  var searchSuite3 = hash3.substr(0,1);
  var searchNum3 = hash3.substr(-1);;

  var suit3 = suits[searchSuite3];
  var number3 = numbers[searchNum3];

  var card3 = {
    "hash": hash3,
    "suit" : suit3,
    "number": number3,
    "city": location3.city,
    "state": location3.state,
    "zip":  location3.zip,
  };


  var searchSuite4 = hash4.substr(0,1);
  var searchNum4 = hash4.substr(-1);;

  var suit4 = suits[searchSuite4];
  var number4 = numbers[searchNum4];

  var card4 = {
    "hash": hash4,
    "suit" : suit4,
    "number": number4,
    "city": location4.city,
    "state": location4.state,
    "zip":  location4.zip,
  };

  getCandidate(hash)
  .then(function(val) {
    card1.candidate = val.data;
    cards.card1 = card1
    
    getCandidate(hash2)
    .then(function(val2) {
      card2.candidate = val2.data;
      cards.card2 = card2;

    getCandidate(hash3)
    .then(function(val3) {
      card3.candidate = val3.data;
      cards.card3 = card3;
    })

    getCandidate(hash4)
    .then(function(val4) {
      card4.candidate = val4.data;
      cards.card4 = card4;
      //OUTPUT THE CARD JSON TO BROWSER 
      res.json(cards);
    })


    })

  });
  



});

function getCandidate(hash) {
  return axios.get('http://candihash:7001/candidates/candidate?matric_value='+hash);
}


module.exports = router;
