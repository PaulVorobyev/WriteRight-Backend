var express = require('express');
var router = express.Router();
var AlchemyAPI = require("alchemy-api");
var config = require("../config");
var alchemy = new AlchemyAPI(config.alchemyAPIKey);

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
