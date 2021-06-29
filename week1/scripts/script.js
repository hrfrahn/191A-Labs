const map = L.map('map').setView([34.0709, -118.444], 8);


// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
      
fetch("camping.geojson")
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
            // the leaflet method for adding a geojson
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {color: "blue"});
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.name;
            })
            .addTo(map)
            .openPopup();
        });