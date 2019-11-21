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
      "img":"https://upload.wikimedia.org/wikipedia/commons/d/dd/Senator_Harris_official_senate_portrait.jpg"
  }


  var sanders = {
    "name": "Bernie Sanders",
    "storeUrl":"sanders.2020.codes",
    "img":"https://upload.wikimedia.org/wikipedia/commons/0/0c/Bernie_Sanders_July_2019_%28cropped%29.jpg"
  }


  var warren = {
      "name": "Elizabeth Warren",
      "storeUrl":"warren.2020.codes",
      "img":"https://upload.wikimedia.org/wikipedia/commons/6/6a/Elizabeth_Warren%2C_official_portrait%2C_114th_Congress.jpg"
  }


  var buttigieg = {
    "name": "Pete Buttigieg",
    "storeUrl":"warren.2020.codes",
    "img":"https://upload.wikimedia.org/wikipedia/commons/b/bf/Pete_Buttigieg_by_Gage_Skidmore.jpg"
  }

   var yang = {
      "name": "Andrew Yang",
      "storeUrl":"yang.2020.codes",
      "img":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Andrew_Yang_by_Gage_Skidmore.jpg"
  }


  var biden = {
      "name": "Joe Biden",
      "storeUrl":"biden.2020.codes",
      "img":"https://upload.wikimedia.org/wikipedia/commons/6/64/Biden_2013.jpg"
  }

  var klobuchar = {
    "name": "Amy Klobuchar",
    "storeUrl":"klobuchar.2020.codes",
    "img":"https://upload.wikimedia.org/wikipedia/commons/b/b7/Amy_Klobuchar%2C_official_portrait%2C_113th_Congress.jpg"
  }

var booker = {
  "name": "Cory Booker",
  "storeUrl":"booker.2020.codes",
  "img":"https://upload.wikimedia.org/wikipedia/commons/5/59/Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg"
}

var gabbard = {
  "name": "Tulsi Gabbard",
  "storeUrl":"gabbard.2020.codes",
  "img":"https://upload.wikimedia.org/wikipedia/commons/2/2a/Tulsi_Gabbard%2C_official_portrait%2C_113th_Congress.jpg"
}

var steyer = {
  "name": "Tom Steyer",
  "storeUrl":"steyer.2020.codes",
  "img":"https://upload.wikimedia.org/wikipedia/commons/6/61/Tom_Steyer_by_Gage_Skidmore.jpg"
}


var castro = {
  "name": "Julián Castro",
  "storeUrl":"castro.2020.codes",
  "img":"https://upload.wikimedia.org/wikipedia/commons/c/c6/Juli%C3%A1n_Castro%27s_Official_HUD_Portrait.jpg"
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
    "c": steyer
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
