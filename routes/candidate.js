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


  const salt = "11:11_777222RAVEN222777_22:22";

  //build hashchain
  var cards = {};
  var hash  = md5(salt + req.query.matric_value + salt);

  var hashBlue = md5(hash + "777blue777");
  zipFull1 = hashBlue.replace(/\D/g,'');
  location1 = extractZip(zipFull1);
  //zipFull1 = "000000000";  uncomment for testing to make sure that invalid zip string is rehashed


  var hashRed = md5(hash + "777red777");
  zipFull2 = hashRed.replace(/\D/g,'');
  location2 = extractZip(zipFull2);


  var searchSuite = hashBlue.substr(0,1);
  var searchNum = hashBlue.substr(-1);;

  var suit = suits[searchSuite];
  var number = numbers[searchNum];


  var card1 = {
    "parentHash": hash,
    "hash": hashBlue,
    "suit" : suit,
    "number": number,
    "city": location1.city,
    "state": location1.state,
    "zip":  location1.zip,
  };


  var searchSuite2 = hashRed.substr(0,1);
  var searchNum2 = hashRed.substr(-1);;

  var suit2 = suits[searchSuite2];
  var number2 = numbers[searchNum2];

  var card2 = {
    "parentHash": hash,
    "hash": hashRed,
    "suit" : suit2,
    "number": number2,
    "city": location2.city,
    "state": location2.state,
    "zip":  location2.zip,
  };

  getCandidate(hashBlue)
  .then(function(val) {
    card1.name = val.data.name;
    card1.matchupId = val.data.matchupId;
    card1.storeUrl = val.data.storeUrl;
    card1.img = val.data.img;
    card1.video = val.data.video;
    cards.card1 = card1
    

    card2.name="President Donald J. Trump";
    card2.storeUrl="trump.2020.codes";
    card2.img="https://media.graytvinc.com/images/810*462/0611Donald+Trump+MGN+Brian+Copeland.jpg";
    card2.hash=hashRed;
    card2.matchupId=val.data.matchupId;
    card2.difficulty=0;
    card2.video = "Tig8y7L2g1s";

    cards.card2 = card2;

    console.log(cards);
    res.json(cards);
  });
  

});

function getCandidate(hash) {
  return axios.get('http://candihash:7001/candidates/candidate?matric_value='+hash);
}


module.exports = router;
