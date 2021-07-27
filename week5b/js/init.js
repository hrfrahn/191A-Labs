const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let speakFluentEnglish = L.markerClusterGroup();
let speakOtherLanguage = L.markerClusterGroup();

function addMarker(data){
    let circleOptions = {
      radius: 6,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    } 
    if(data.doyouspeakenglishfluently == "Yes"){
      circleOptions.fillColor = "green"
      speakFluentEnglish.addLayer( L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data.timestamp}</h2>`))
      createButtons(data.lat,data.lng,data.location)
      return data.timestamp
    }
    else{
      speakOtherLanguage.addLayer( L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data.timestamp}</h2><h3>No English</h3`))
      createButtons(data.lat,data.lng,data.location)
      return data.timestamp
    }
    
}



function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        speakFluentEnglish.addTo(myMap)
        speakOtherLanguage.addTo(myMap)

        let allLayers = L.featureGroup([speakFluentEnglish,speakOtherLanguage]);
        myMap.fitBounds(allLayers.getBounds())        
}

// define layers
let maplayers = {
	"Speaks English": speakFluentEnglish,
	"Speaks Other Languages": speakOtherLanguage
}
// add layer control box
L.control.layers(null,maplayers).addTo(myMap)