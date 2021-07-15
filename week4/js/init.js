const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



let url = "https://spreadsheets.google.com/feeds/list/1yNkjcTXq7NOerbJaU5qvy9XpW49yph1eUZtzjaE5B94/on7xd7h/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        //console.log(data)
        processData(data)
    })


    function processData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
        const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
        // we start a for..of.. loop here 
        for(const row of rows) { 
          const formattedRow = {}
          for(const key in row) {
            // time to get rid of the weird gsx$ format...
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          // add the clean data
          formattedData.push(formattedRow)
        }
        // lets see what the data looks like when its clean!
        console.log(formattedData)
        // we can actually add functions here too
        formattedData.forEach(addObjMarker)

}
function addObjMarker(data){
    console.log(data.lat)
    console.log(data.long)
    L.marker([data.lat, data.long]).addTo(myMap).bindPopup(`<i>${data.location}</i>`)
}    

function addMarker(lat,lng,message){
        L.marker([lat,lng]).addTo(myMap).bindPopup(`<h2>${message}</h2>`)
        return message    
}

