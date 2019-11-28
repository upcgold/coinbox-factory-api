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
      "img":"https://image.cnbcfm.com/api/v1/image/105867117-1556049501630rtx6svfw.jpg?v=1556049563&w=678&h=381",
      "videos": {
        "economy": "w5RWUolzwWU"//youtube vid id
      }
  }


  var sanders = {
    "name": "Bernie Sanders",
    "storeUrl":"sanders.2020.codes",
    "img":"https://cbsnews3.cbsistatic.com/hub/i/r/2019/10/23/16275a12-988d-496b-845a-7ac47b2f6c4a/thumbnail/1200x630/08a8c174b7ad074a7d623866c51cc413/cbsn-fusion-will-congresswoman-rashida-tlaib-endorse-bernie-sanders-thumbnail-382979-640x360.jpg"
  }


  var warren = {
      "name": "Elizabeth Warren",
      "storeUrl":"warren.2020.codes",
      "img":"https://iadsb.tmgrup.com.tr/612016/645/344/1/161/800/587?u=https://idsb.tmgrup.com.tr/2018/12/31/us-democrat-elizabeth-warren-enters-2020-presidential-race-1546281406284.jpg"
  }


  var buttigieg = {
    "name": "Pete Buttigieg",
    "storeUrl":"warren.2020.codes",
    "img":"https://cdn.cnn.com/cnnnext/dam/assets/191119201838-10-pete-buttigieg-lead-image-large-169.jpg"
  }

   var yang = {
      "name": "Andrew Yang",
      "storeUrl":"yang.2020.codes",
      "img":"https://s.abcnews.com/images/Politics/andrew-yang-file-01-rtr-jc-190514_hpMain_16x9_992.jpg"
  }


  var biden = {
      "name": "Joe Biden",
      "storeUrl":"biden.2020.codes",
      "img":"https://cdn.theatlantic.com/assets/media/img/mt/2019/04/RTX6T48T/lead_720_405.jpg?mod=1556212049"
  }

  var klobuchar = {
    "name": "Amy Klobuchar",
    "storeUrl":"klobuchar.2020.codes",
    "img":"https://static01.nyt.com/images/2019/09/10/us/politics/10-klobuchar-candidatepage/10-klobuchar-candidatepage-facebookJumbo.jpg"
  }

var booker = {
  "name": "Cory Booker",
  "storeUrl":"booker.2020.codes",
  "img":"https://miro.medium.com/max/4096/1*zUx6JY4uxY4wfnyzn1Cfuw.jpeg"
}

var gabbard = {
  "name": "Tulsi Gabbard",
  "storeUrl":"gabbard.2020.codes",
  "img":"https://www.newstatesman.com/sites/default/files/styles/cropped_article_image/public/blogs_2019/10/gettyimages-1173866046.jpg?itok=9ZDfbFd2&c=84d30345b25300b88238c0e74ec8a23d"
}

var steyer = {
  "name": "Tom Steyer",
  "storeUrl":"steyer.2020.codes",
  "img":"https://cdn1.thr.com/sites/default/files/imagecache/landscape_928x523/2019/10/screen_shot_2019-10-13_at_2.35.21_pm.png"
}


var castro = {
  "name": "Julián Castro",
  "storeUrl":"castro.2020.codes",
  "img":"https://cdn.cnn.com/cnnnext/dam/assets/190717133057-01b-julian-castro-restricted-large-169.jpg"
}

var bloomberg = {
  "name": "Michael Bloomberg",
  "storeUrl":"bloomberg.2020.codes",
  "img":"https://compote.slate.com/images/2bec7c0b-5913-4ffc-9d72-8cfca894f27d.jpeg?width=780&height=520&rect=5137x3425&offset=0x277"
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
    "c": steyer,
    "d": bloomberg
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
