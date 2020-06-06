var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

////////////
//
//ES WRAPPER
//
/////////////
router.post('/_msearch/', function (req, res, next) {
  //res.json({ board: "hello!" });

	console.log(req);
	console.log('----------------------');

	console.log(req.body);
  res.json({ board: req.body });
});


module.exports = router;
