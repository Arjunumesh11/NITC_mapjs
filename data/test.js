var Datastore = require('nedb');
db = new Datastore('nitc_nodes_all.db');
nitc_node = new Datastore('nitc_nodes.db');
nitc_path = new Datastore('nitc_paths.db');
db.loadDatabase();
nitc_node.loadDatabase();
nitc_path.loadDatabase();
nitc_node.find({ "tags.building": { $in: ['yes'] } }, (err, doc) => {
    doc.forEach(element => {
        // console.log(element.nodes);
        db.find({ id: { $in: element.nodes } }, { lat: 1, lon: 1, _id: 0 }, (err, doc1) => {
            // console.log(doc1);
            nitc_path.insert({ id: element.id, nodes: doc1 });
        });
    });

});
