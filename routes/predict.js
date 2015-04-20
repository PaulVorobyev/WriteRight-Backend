var express = require('express');
var router = express.Router();
var request = require('request');
var AlchemyAPI = require("alchemy-api");
var config = require("../config");
var alchemy = new AlchemyAPI(config.alchemyAPIKey);
<<<<<<< HEAD
var xml2js = require('xml2js');
var googlemaps = require('googlemaps');
=======
var wolfram = require('wolfram').createClient("L5P73K-T6KKXEQ5YJ");
>>>>>>> d827914fe977e2213f56d10bc274260edf50b3d4

// alchemy
function alchemyEntities(sentence, cb){
    alchemy.entities(sentence, {}, function(err, apires){
        if (err) cb(err, null);

        cb(null, apires.entities);
    });
}

function alchemyKeywords(sentence, cb){
    alchemy.keywords(sentence, {}, function(err, apires){
        if (err) cb(err, null);

        cb(null, apires.keywords);
    });
}

// other 
function wolframAlpha(input, cb){
	 var WOLFRAM_URL = "http://api.wolframalpha.com/v2/query?input=" + input + "&appid=LH6H2W-7VVTXT66J9";
     request(WOLFRAM_URL, function(err, res, body){
        if(err) {
            cb(err, null);
        } else {
            xml2js.parseString(body, function(err, parsedXML){
                if(err) {
                    cb(err, null)
                } else {
                    cb(null, parsedXML);
                }
            });
        }
     });
}

function googleIt(input, cb){
    var GOOGLE_URL = "http://suggestqueries.google.com/complete/search?client=chrome&q=" + input;
    request(GOOGLE_URL, function(err, res, body){
        if (err) {
            cb(err, null);
        } else {
            cb(null, body);
        }

    });
}  



// everything else
function returnOptions(sentence, cb){
    var autocorrectOptions = [];
    alchemyEntities(sentence, function(err, entities){
        if (err) cb(err, null);
        alchemyKeywords(sentence, function(err, keywords){
            if (err) cb(err, null);

            autocorrectOptions = autocorrectOptions.concat(entities, keywords);
            cb(null, autocorrectOptions);
        });
    });
}

router.post('/parseSentence', function(req, res) {
    returnOptions(req.body.userInput, function(err, array){
        if (err) res.json(err);
        function isPlace(type){
            console.log(type +"f");
            return (type === "Country") || (type === "StateOrCountry") || (type === "State") || (type === "City")
        }
        function isIn(){
            return (req.body.userInput.indexOf("is in") !== -1)
        }

        if(array[0] && isPlace(array[0].type) && isIn()){  
            googlemaps.geocode(array[0].text, function(err, result){
                console.log(result);
            }, false);
        } else {
            wolframAlpha(req.body.userInput, function(err, results){
                    try {
                        console.log(results);
                        (results.queryresult && results.queryresult.pod) ? res.json(results.queryresult.pod['1'].subpod['0'].plaintext[0]) : res.json(">>")
                    } catch(error) {
                        res.json("Error :(")
                    }
            });
        }
    });
});
module.exports = router;
