const express = require('express');
const Datastore = require('nedb');
var nitc_buliding = new Datastore('./data/nitc_buliding.db');
nitc_buliding.loadDatabase();

const routes = express();
routes.get('/api/node/:name', (req, res) => {
    var data = req.params;
    nitc_buliding.findOne({ name: data.name }, (err, doc) => {

        res.send(doc);
    });
});
module.exports = routes;
