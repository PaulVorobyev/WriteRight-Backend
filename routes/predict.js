var express = require('express');
var router = express.Router();
var AlchemyAPI = require("alchemy-api");
var config = require("../config");
var alchemy = new AlchemyAPI(config.alchemyAPIKey);

// alchemy
function alchemyEntities(sentence, cb){
    alchemy.entities(sentence, {}, function(err, apires){
        if (err) cb(err, null);

        cb(null, apires.entities);
    });
}

function alchemyKeywords(sentence, cb){
    alchemy.keywords(sentence, {}, function(err, apires){
        if (err) return cb(err, null);

        cb(null, apires.entities);
    });
}

// other 
function wolframAlpha(){
	var wolfram = require('wolfram-alpha').createClient("L5P73K-T6KKXEQ5YJ", opts);
	 
	wolfram.query("integrate 2x", function (err, result) {
		  if (err) throw err;
		    console.log("Result: %j", result);
	});
}

// everything else
function returnOptions(sentence, cb){
    
}

router.post('/parseSentence', function(req, res) {
    returnOptions(req.body.userInput, function(err, array){
        res.json(array);
    });
	console.log("output");
});
module.exports = router;
