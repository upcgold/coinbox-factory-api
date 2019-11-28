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

  getCandidate(hash)
  .then(function(val) {
    card1.candidate = val.data;
    cards.card1 = card1
    
    val2 = {};
    val2.data = {};
    val2.data.name="President Donald J. Trump";
    val2.data.storeUrl="trump.2020.codes";
    val2.data.img="https://media.graytvinc.com/images/810*462/0611Donald+Trump+MGN+Brian+Copeland.jpg";
    val2.data.hash=hash2;
    val2.data.difficulty=0;
    val2.data.videos = {};
    val2.data.videos.economy = "m-AYdkXpDA8";



    
    card2.candidate = val2.data;
    cards.card2 = card2;


    res.json(cards);
  });
  

});

function getCandidate(hash) {
  return axios.get('http://candihash:7001/candidates/candidate?matric_value='+hash);
}


module.exports = router;
