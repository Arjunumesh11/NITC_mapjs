var mymap = L.map('mapid', { crs: L.CRS.Simple, minZoom: 17, dragging: false });
var imageUrl = 'nitcmap.png';
var imageBounds = [[11.3180, 75.9309], [11.3238, 75.9388]];
L.imageOverlay(imageUrl, imageBounds).addTo(mymap);
mymap.setView([11.3209, 75.93485], 17);
const marker = L.marker([0, 0]).addTo(mymap);
async function getdata() {
    const response = await fetch("/api/node/all");
    const data = await response.json();
    for (var key in data)
        L.marker([data[key].lat, data[key].lon], { title: data[key].name }).addTo(mymap);
}
async function drawline() {
    const response = await fetch("/api/path/asdf");
    const data = await response.json();
    data.forEach(async element => {

        var ar = await element.nodes.map((obj) => { return (Object.values(obj)); });
        var polyline = L.polygon(ar, { color: 'red', smoothFactor: 20 }).addTo(mymap);
    });
}
drawline();
//getdata();

