var express = require('express');
var router = express.Router();
var md5 = require('md5');


//post a guid, and get back the data for a card
//this card will be cached in mongo
//and when the card data is stored, the card is returned to the user.



/* create matric, add, return json to the user */
router.get('/candidate/', function (req, res, next) {

  //need to do the mapping one time someplace else

  var matric = req.query.matric_value;
  var ballot = [];

  var harris = {
      "name": "Kamilla Harris",
      "storeUrl":"harris.2020.codes",
      "img":"img.jpg"
  }


  var sanders = {
    "name": "Bernie Sanders",
    "storeUrl":"sanders.2020.codes",
    "img":"img.jpg"
}


  var warren = {
      "name": "Elizabeth Warren",
      "storeUrl":"warren.2020.codes",
      "img":"img.jpg"
  }


  var buttigieg = {
    "name": "Pete Buttigieg",
    "storeUrl":"warren.2020.codes",
    "img":"img.jpg"
}

   var yang = {
      "name": "Andrew Yang",
      "storeUrl":"yang.2020.codes",
      "img":"img.jpg"
  }


  var biden = {
      "name": "Joe Biden",
      "storeUrl":"biden.2020.codes",
      "img":"img.jpg"
  }

  var klobuchar = {
    "name": "Amy Klobuchar",
    "storeUrl":"klobuchar.2020.codes",
    "img":"img.jpg"
}

var booker = {
  "name": "Cory Booker",
  "storeUrl":"booker.2020.codes",
  "img":"img.jpg"
}

var gabbard = {
  "name": "Tulsi Gabbard",
  "storeUrl":"gabbard.2020.codes",
  "img":"img.jpg"
}

var steyer = {
  "name": "Tom Steyer",
  "storeUrl":"steyer.2020.codes",
  "img":"img.jpg"
}


var castro = {
  "name": "Julián Castro",
  "storeUrl":"castro.2020.codes",
  "img":"img.jpg"
}


  var choices = {
    "1": biden,
    "2": warren,
    "3": yang,
    "4": harris,
    "5": buttigieg,
    "6": warren,
    "7": sanders,
    "8": klobuchar,
    "9": booker,
    "a": gabbard,
    "b": castro,


  }



  console.log("value is " + matric);

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
  var rehash = 0;
  for (i = i; i < 31; i++) {
    if (Object.keys(ballot).length == 1) break;
    searchKey = matric.substr(i, 1);
    if (choices.hasOwnProperty(searchKey)) {
      var candObj = choices[searchKey];
      candObj.hash = matric;
      candObj.difficulty = rehash;
      delete choices[searchKey];
      console.log("candidate is " + candObj.name);
      res.json(candObj);
      return;
    }
    if(i==30){
      i=0;
      rehash++;
      matric = md5(matric);
      console.log("rehashing. candihash is now " + matric);
    }
  }

  res.json({});

});

module.exports = router;
