const express = require('express');
const Datastore = require('nedb');
var nitc_buliding = new Datastore('./data/nitc_buliding.db');
var nitc_paths = new Datastore('./data/nitc_nodes.db');
var nitc_nodes = new Datastore('./data/nitc_nodes_all.db');
nitc_buliding.loadDatabase();
nitc_paths.loadDatabase();
nitc_nodes.loadDatabase();

const routes = express();
routes.get('/api/node/:name', (req, res) => {
    var data = req.params;
    if (data.name == "all") {
        nitc_buliding.find({}, (err, doc) => {

            res.send(doc);
        });
    }
    else {
        nitc_buliding.findOne({ name: data.name }, (err, doc) => {

            res.send(doc);
        });
    }
});
routes.get('/api/path/:name', (req, res) => {
    var data = req.params;
    var paths = [];
    // if (data.name == "all") {
    //     nitc_paths.find({ "tags.highway": { $exists: true, $nin: ['unclassified', 'residential'] } }, (err, doc) => {
    //         res.send(doc);
    //     });
    // }
    // else {
    nitc_paths.findOne({ "tags.highway": { $exists: true, $nin: ['unclassified', 'residential'] } }, (err, doc) => {
        for (key in doc.nodes) {
            nitc_nodes.findOne({ id: doc.nodes[key] }, (err, nodes_doc) => {
                res.send(nodes_doc);
            });

        }
        // res.send(doc);
        //console.log(paths);
    });
    //     });
    // }
    // console.log("sa");
});
module.exports = routes;
