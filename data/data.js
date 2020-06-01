var Datastore = require('nedb');
var nitc_buliding = new Datastore('nitc_buliding.db');
var nitc_nodes = new Datastore('nitc_nodes_all.db');
var nitc_way = new Datastore('nitc_nodes.db');
nitc_way.loadDatabase();
nitc_nodes.loadDatabase();
nitc_buliding.loadDatabase();
function createbulding() {
    let name, nodes, lat, lon;
    nitc_way.find({ "tags.building": "yes" }, (err, doc) => {
        const keys = Object.entries(doc);
        for (const key of keys) {
            if (key[1].tags.name) {
                nitc_nodes.findOne({ id: key[1].nodes[0] }, (err, doc) => {
                    if (doc) {
                        name = key[1].tags.name;
                        lat = doc.lat; lon = doc.lon;
                        console.log(nodes);
                        nitc_buliding.insert({ name, node: key[1].nodes[0], lat, lon });
                    }
                });
            }
        }
    });
}
createbulding();