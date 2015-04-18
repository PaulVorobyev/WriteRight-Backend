var express = require('express');
var router = express.Router();
var AlchemyAPI = require("alchemy-api");
var config = require("../config");
var alchemy = new AlchemyAPI(config.alchemyAPIKey);

// alchemy
function alchemyEntities(sentence, cb){
    var entities;
    alchemy.entities(sentence, {}, function(err, apires){
        if (err) cb(err, null);

        cb(null, apires.entities);
    });
}

function alchemyKeywords(sentence, cb){
    var keywords;
    alchemy.keywords(sentence, {}, function(err, apires){
        if (err) return cb(err, null);

        cb(null, apires.entities);
    });
}

// other 
function wolframAlpha(){

}

// everything else
function returnOptions(sentence, cb){
    
}





router.post('/parseSentence', function(req, res) {
    returnOptions(req.body.userInput, function(err, array){
        res.json(array);
    });

});
module.exports = router;







