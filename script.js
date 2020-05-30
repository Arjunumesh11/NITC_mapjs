var mymap = L.map('mapid').setView([51.505, -0.09], 2);
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
tiles.addTo(mymap);
var path;
async function getdata() {
    const response = await fetch("https://www.overpass-api.de/api/interpreter?data=[out:json];node(11.3180,75.9309,11.3238,75.9388);way(11.3180,75.9309,11.3238,75.9388);out%20meta;");
    const data = await response.json();
    const path = data.elements[0];
    // console.log(path);
    return path;
}
async function printlatlng(path) {
    path = await getdata();
    const url = "https://www.overpass-api.de/api/interpreter?data=[out:json];";
    var pathelement = path.nodes;
    console.log(pathelement[0]);
    const response = await fetch(url + "node(" + pathelement[0].toString() + ");out%20meta;");
    const data = await response.json();
    console.log(data);
    console.log(data.elements[0].lat + " " + data.elements[0].lon);
    setpos(data.elements[0].lat, data.elements[0].lon);
}
const marker = L.marker([0, 0]).addTo(mymap);
async function setpos(latitude, longitude) {
    mymap.setView([latitude, longitude], 16);
    marker.setLatLng([latitude, longitude]);
}
printlatlng(path);