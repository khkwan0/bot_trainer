var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 'training_data': req.app.get('training_data'), 'response_data': req.app.get('response_data') });
});

router.post('/', function(req, res, next) {
    classification = req.body.cl;
    sentence = req.body.se;
    sentence = sentence.trim();
    classification = classification.trim();
    training_data = JSON.parse(req.app.get('training_data'));
    if (typeof training_data[classification] !== 'undefined') {
        console.log(training_data[classification]);
        training_data[classification].push(sentence);
    } else {
        training_data[classification] = [];
        training_data[classification].push(sentence);
    }
    rv = JSON.stringify(training_data, null, 4);
    fs.writeFile(path.join(__dirname + '/../lib/training_data.json'), rv, 'utf8');
    req.app.set('training_data', rv);
    res.status(200).send(rv);
});
module.exports = router;
