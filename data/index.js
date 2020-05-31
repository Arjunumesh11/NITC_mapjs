const fetch = require('node-fetch');
var Datastore = require('nedb');
db = new Datastore('nitc_nodes_all.db');
db.loadDatabase();
async function getdata() {
    const response = await fetch("https://www.overpass-api.de/api/interpreter?data=[out:json];node(11.3180,75.9309,11.3238,75.9388);out%20meta;");
    const data = await response.json();
    await db.insert(data.elements, (err, newdoc) => { if (err) { console.log(err); } });
}
getdata();