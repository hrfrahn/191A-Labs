let mapInfo = {"coords":[34.0709, -118.444], "zoom":5}

const myMap = L.map('mapArea').setView(mapInfo.coords, mapInfo.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// adding markers

let myObj = {"name":"harry","location":"home"}

function addMarker(lat,lng, title, message){
    console.log(message)
    L.marker([lat,lng]).addTo(myMap).bindPopup(message)
	createButtons(lat, lng, title)
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]); //this is the flyTo from Leaflet but using "myMap" as the target
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}


addMarker(50,50,"hey", "yoooo")
addMarker(39, -122, "First Point", "1")
addMarker(34, -122.484, "Second Point", "2")
addMarker(34.0709, -188, "Third Point", "3")
addMarker(34.5, -122, "Another Point", "aaaaa")

const buttonElement = document.getElementById('buttonFirst Point')
const button2 = document.getElementById('buttonSecond Point')
const button3 = document.getElementById('buttonThird Point')
const button4 = document.getElementById('buttonAnother Point')


buttonElement.addEventListener("mouseover", function(event){
	event.target.style.background = "green";
})

buttonElement.addEventListener("mouseleave", function(event){
	event.target.style.background = "";

})

button2.addEventListener("mouseover", function(event){
	event.target.style.background = "purple";
})

button2.addEventListener("mouseleave", function(event){
	event.target.style.background = "";

})

button3.addEventListener("mouseover", function(event){
	event.target.style.background = "blue";
})

button3.addEventListener("mouseleave", function(event){
	event.target.style.background = "";

})

button4.addEventListener("mouseover", function(event){
	event.target.style.background = "orange";
})

button4.addEventListener("mouseleave", function(event){
	event.target.style.background = "";

})



console.log(myObj.name)