var Datastore = require('nedb');
db = new Datastore('nitc_nodes_all.db');
db.loadDatabase();
db.find({ id: 3655147185 }, (err, doc) => {
    console.log(doc);
});