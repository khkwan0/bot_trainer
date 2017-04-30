var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.post('/', function(req, res, next) {
    label = req.body.label;
    response = req.body.response;
    label = label.trim();
    response = response.trim();
    response_data = JSON.parse(req.app.get('response_data'));
    if (typeof response_data[label] !== 'undefined') {
        response_data[label].push(response);
    } else {
        response_data[label] = [];
        response_data[label].push(response);
    }
    rv = JSON.stringify(response_data, null, 4);
    fs.writeFile(path.join(__dirname + '/../lib/response_data.json'), rv, 'utf8');
    req.app.set('response_data', rv);
    res.status(200).send(rv);
});
module.exports = router;
