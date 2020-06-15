var express = require('express');
var router = express.Router();
var md5 = require('md5');
const axios = require('axios')
var zipcodes = require('zipcodes');
const salt = "11:11_777222RAVEN222777_22:22:2222";


const CAPITALS = {};


CAPITALS.AL = "Montgomery";
CAPITALS.AK = "Juneau";
CAPITALS.AZ = "Phoenix";
CAPITALS.AR = "Little Rock";
CAPITALS.CA = "Sacramento";
CAPITALS.CO = "Denver";
CAPITALS.CT = "Hartford";
CAPITALS.DW = "Dover";
CAPITALS.FL = "Tallahassee";
CAPITALS.GA = "Atlanta";
CAPITALS.HI = "Honolulu";
CAPITALS.ID = "Boise";
CAPITALS.IL = "Springfield";
CAPITALS.IN = "Indianapolis";
CAPITALS.IA = "Des Moines";
CAPITALS.KS = "Topeka";
CAPITALS.KY = "Frankfort";
CAPITALS.LA = "Baton Rouge";
CAPITALS.ME = "Augusta";
CAPITALS.MD = "Annapolis";
CAPITALS.MA = "Boston";
CAPITALS.MI = "Lansing";
CAPITALS.MN = "Saint Paul";
CAPITALS.MS = "Jackson";
CAPITALS.MO = "Jefferson City";
CAPITALS.MT = "Helena";
CAPITALS.NE = "Lincoln";
CAPITALS.NV = "Carson City";
CAPITALS.NH = "Concord";
CAPITALS.NJ = "Trenton";
CAPITALS.NM = "Santa Fe";
CAPITALS.NY = "Albany";
CAPITALS.NC = "Raleigh";
CAPITALS.ND = "Bismark";
CAPITALS.OH = "Columbus";
CAPITALS.OK = "Oklahoma City";
CAPITALS.OR = "Salem";
CAPITALS.PA = "Harrisburg";
CAPITALS.RI = "Providence";
CAPITALS.SC = "Columbia";
CAPITALS.SD = "Pierre";
CAPITALS.TN = "Nashville";
CAPITALS.TX = "Austin";
CAPITALS.UT = "Salt Lake City";
CAPITALS.VT = "Montpelier";
CAPITALS.VA = "Richmond";
CAPITALS.WA = "Olympia";
CAPITALS.WV = "Charleston";
CAPITALS.WI = "Madison";
CAPITALS.WY = "Cheyenne";



//post a guid, and get back the data for a card
//this card will be cached in mongo
//and when the card data is stored, the card is returned to the user.

function extractZip(zipFull1) {
  location1Valid = false;
  var zips = [];

  var location1;
  while (!location1Valid) {
    for (i = 0; i < zipFull1.length - 5; i++) {
      location1 = zipcodes.lookup(zipFull1.substr(i, 5));
      if (location1 && location1.state != 'AE') {
        location1Valid = true;
        location1.tribe = "Normal";
        for(var i in CAPITALS) {
          if( (i == location1.state) && (location1.city == CAPITALS[i])) {
                  location1.tribe = "Capital";
          }
        }
        zips.push(location1);
        break;
      }
    }
    if (!location1) {
      hash = md5(zipFull1);
      zipFull1 = hash.replace(/\D/g, '');
    }
  }
  return zips;
}


function extractZips(zipFull1, targetCount) {

  location1Valid = false;
  var currentCount = 0;
  var zips = [];
  var capitalCard = false;
  targetCount = 1;

  while (zips.length < targetCount) {
    for (i = 0; i < zipFull1.length - 5; i++) {
      var location1 = zipcodes.lookup(zipFull1.substr(i, 5));
      if (location1) {
/*
        for(var i in CAPITALS) {
          if( (i == location1.state) && (location1.city == CAPITALS[i])) {
                  capitalCard = true
          }
        }
        */
        zips.push(location1);
      }
    }
  }

  if(capitalCard) {
    console.log("capital card " + location1.state + " is " + location1.city); 
  }
  else {
    console.log("normal card " + location1.state + " is " + location1.city); 
  }
  return zips;
}


////////////////////////
/////
///// rivals.wally.codes
/////
////////////////////////
router.get('/rivals/', function (req, res, next) {
  var hash = md5(req.query.matric_value);
  var originalScan = req.query.matric_value;


  var card = {};


  switch (hash.substr(0, 1)) {
    case '0':
      card.vid = "Fp6YAw4YeaA";
      card.deal = "Spin the crypto wheel (Must sign up for wallet at https://www.coinbase.com)";
      break;
    case '1':
      card.vid = "MeGdbjL7OjU";
      card.deal = "Surprise in a red box";
      break;
    case '2':
      card.vid = "87ztl_H1AXw";
      card.deal = "Surprise in a green box";
      break;
    case '3':
      card.vid = "thEfZDHBGWs";
      card.deal = "25% off your entire order";
      break;
    case '4':
      card.vid = "5X00-IEQEDY";
      card.deal = "$3 off order";
      break;
    case '5':
      card.vid = "4Ir5nz6aFRw";
      card.deal = "Free bandana with purchase";
      break;
    case '6':
      card.vid = "thEfZDHBGWs";
      card.deal = "25% off your entire order";
      break;
    case '7':
      card.vid = "thEfZDHBGWs";
      card.deal = "25% off your entire order";
      break;
    case '8':
      card.vid = "Fp6YAw4YeaA";
      card.deal = "Spin the crypto wheel (Must sign up for wallet at https://www.coinbase.com)";
      break;
    case '9':
      card.vid = "MeGdbjL7OjU";
      card.deal = "Surprise in a red box";
      break;
    case 'a':
      card.vid = "Fp6YAw4YeaA";
      card.deal = "Spin the crypto wheel (Must sign up for wallet at https://www.coinbase.com)";
      break;
    case 'b':
      card.vid = "Fp6YAw4YeaA";
      card.deal = "Spin the crypto wheel (Must sign up for wallet at https://www.coinbase.com)";
      break;
    case 'c':
      card.vid = "87ztl_H1AXw";
      card.deal = "Surprise in a green box";
      break;
    case 'd':
      card.vid = "MeGdbjL7OjU";
      card.deal = "Surprise in a red box";
      break;
    case 'e':
      card.vid = "87ztl_H1AXw";
      card.deal = "Surprise in a green box";
      break;
    case 'f':
      card.vid = "87ztl_H1AXw";
      card.deal = "Surprise in a green box";
      break;
  }

  card.hash = hash;
  card.promoCode = hash.substr(0,5);
  card.originalScan = originalScan;

  res.json({ card: card });
});







////////////////////////
/////
///// Hashtag.green
/////
////////////////////////
router.get('/hashgreen/', function (req, res, next) {
  var hash = md5(req.query.matric_value);
  var originalScan = req.query.matric_value;


  var card = {};


  switch (hash.substr(0, 1)) {
    case '0':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '1':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '2':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '3':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '4':
      card.deal = "10% off purchase";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '5':
      card.deal = "$5 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '6':
      card.deal = "$1 gram flower";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '7':
      card.deal = "Free gram of flower";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '8':
      card.deal = "Free gram of flower";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case '9':
      card.deal = "10% off purchase";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case 'a':
      card.deal = "Free pack of rolling paper";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case 'b':
      card.deal = "Free pack of rolling paper";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case 'c':
      card.deal = "Free grinder";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case 'd':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case 'e':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
    case 'f':
      card.deal = "$1 preroll";
      card.pic = "https://www.gannett-cdn.com/-mm-/3eb9009c1a9366e33a28c376eca11ea26824544a/c=0-44-580-370/local/-/media/2017/11/05/USATODAY/usatsports/marijuana-joint-over-cannabis-leaf-pot-weed-legalize-getty_large.jpg?width=580&height=326&fit=crop&format=pjpg&auto=webp";
      break;
  }

  card.hash = hash;
  card.promoCode = hash.substr(0,5);
  card.originalScan = originalScan;

  res.json({ card: card });
});



////////////////////////
/////
/////De Ja Vu
/////
////////////////////////
router.get('/dejavu/', function (req, res, next) {
  var hash = md5(req.query.matric_value);
  var originalScan = req.query.matric_value;


  var card = {};


  switch (hash.substr(0, 1)) {
    case '0':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Amber";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '1':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879675-stock-photo-stripper-sign.jpg";
      card.girlName = "Ashlee";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '2':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Jessie";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '3':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Nina";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '4':
      card.deal = "$5 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Zoie";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '5':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Kora";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '6':
      card.deal = "$10 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Farrah";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '7':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Cara";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '8':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Hayleigh";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case '9':
      card.deal = "$1 of cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Paige";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case 'a':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Willow";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case 'b':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Melanie";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case 'c':
      card.deal = "$3 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Olivia";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case 'd':
      card.deal = "$2 off drink";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Phoebe";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case 'e':
      card.deal = "$1 off drink";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Katie";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
    case 'f':
      card.deal = "$1 off cover";
      card.pic = "https://st2.depositphotos.com/1454700/5987/i/950/depositphotos_59879125-stock-photo-stripper-sign.jpg";
      card.girlName = "Jasilyn";
      card.girlBio  = "Lorem ipsum dolor sit amet, ei sit oblique probatus. Eu enim lucilius pro, soluta populo cu vim. Eu has adhuc platonem vituperata, his nihil causae singulis te, ne quo tale veri. Eos no harum possim, an sea debitis omnesque, case erant scripta ex pri.";
      break;
  }

  card.hash = hash;
  card.promoCode = hash.substr(0,5);
  card.originalScan = originalScan;

  res.json({ card: card });
});


////////////////////////
/////
/////BOARD
/////
////////////////////////







router.get('/board/', function (req, res, next) {
  //var fullHash = req.query.matric_value

  var d = new Date();
  var dateString = d.toISOString().split('T')[0];
  dateString = dateString + d.getHours();
  var fullHash = md5(salt + req.query.matric_value + salt + dateString);
  zipFull1 = fullHash.replace(/\D/g, '');
  var locations = extractZip(fullHash);

  res.json({ board: locations });
});


/* create matric, add, return json to the user */
router.get('/scan/', function (req, res, next) {

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



  //build hashchain
  var cards = {};
  var hash = md5(salt + req.query.matric_value + salt);

  var hashBlue = md5(hash + "777blue777");
  zipFull1 = hashBlue.replace(/\D/g, '');
  location1 = extractZip(zipFull1);
  //zipFull1 = "000000000";  uncomment for testing to make sure that invalid zip string is rehashed


  var hashRed = md5(hash + "777red777");
  zipFull2 = hashRed.replace(/\D/g, '');
  location2 = extractZip(zipFull2);


  var searchSuite = hashBlue.substr(0, 1);
  var searchNum = hashBlue.substr(-1);;

  var suit = suits[searchSuite];
  var number = numbers[searchNum];


  var card1 = {
    "originalScan": req.query.matric_value,
    "parentHash": hash,
    "hash": hashBlue,
    "suit": suit,
    "number": number,
    "city": location1.city,
    "state": location1.state,
    "zip": location1.zip,
  };


  var searchSuite2 = hashRed.substr(0, 1);
  var searchNum2 = hashRed.substr(-1);;

  var suit2 = suits[searchSuite2];
  var number2 = numbers[searchNum2];

  var card2 = {
    "originalScan": req.query.matric_value,
    "parentHash": hash,
    "hash": hashRed,
    "suit": suit2,
    "number": number2,
    "city": location2.city,
    "state": location2.state,
    "zip": location2.zip,
  };

  getCandidate(hashBlue)
    .then(function (val) {
      card1.name = val.data.name;
      card1.matchupId = val.data.matchupId;
      card1.storeUrl = val.data.storeUrl;
      card1.img = val.data.img;
      card1.video = val.data.video;
      cards.card1 = card1


      card2.name = "President Donald J. Trump";
      card2.storeUrl = "trump.2020.codes";
      card2.img = "https://media.graytvinc.com/images/810*462/0611Donald+Trump+MGN+Brian+Copeland.jpg";
      card2.hash = hashRed;
      card2.matchupId = val.data.matchupId;
      card2.difficulty = 0;
      card2.video = "Tig8y7L2g1s";

      cards.card2 = card2;

      console.log(cards);
      res.json(cards);
    });


});

function getCandidate(hash) {
  return axios.get('http://candihash:7001/candidates/candidate?matric_value=' + hash);
}


module.exports = router;

