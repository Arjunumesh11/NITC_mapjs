var Datastore = require('nedb');
db = new Datastore('nitc_nodes_all.db');
db1 = new Datastore('nitc_paths_all.db');
nit = new Datastore('nitc_paths.db');
db.loadDatabase();
db1.loadDatabase();
nit.loadDatabase();
nit.find({}, (err, doc) => {
    for (key in doc) {
        for (node in doc[key].nodes) {
            db.findOne({ id: doc[key].nodes[node] }, (err, latlng) => {
                console.log(doc[key].id);
                let ids = doc[key].id;
                if (latlng) {
                    db1.find({ id: ids }, (err, de) => {

                    });
                }
            });
        }
    }
});
db1.persistence.compactDatafile();