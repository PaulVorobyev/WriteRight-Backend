var express = require('express');
var router = express.Router();
var AlchemyAPI = require("alchemy-api");
var config = require("../config");
var alchemy = new AlchemyAPI(config.alchemyAPIKey);

<<<<<<< HEAD
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







=======
/* GET home page. */
router.post('/parseSentence', function(req, res) {
    alchemy.entities(req.body.userInput, {}, function(err, apires){
        if (err) throw err;

        var entities = apires.entities;
        console.log(apires);
        res.json(entities);
    });
});
module.exports = router;
>>>>>>> c7883ce6805285eb21a8a03e006186ea59041d93
