var userCityField = document.getElementById('userCity')
var getWeather = document.getElementById('getWeather')
var btnContainer = document.getElementById('btnContainer')
var form = document.getElementById('form')
var wContainer = document.getElementById('wContainer')
var usercity;
var reSearch
var cities = [];




// log city searched and generate 
function processClick (event) {
    event.preventDefault()
    usercity = userCityField.value
    userCityField.value = "" 
    cities.push(usercity)
   
    var citiesStringify = JSON.stringify(cities)
    localStorage.setItem("cities", citiesStringify)

    var storedCities = localStorage.getItem("cities")
    var citiesParsed = JSON.parse(storedCities)
    
// the users choice will go into a list of buttons that make up the users previously searched cities
// send to local storage first and then take for loop the array that comes out of local storage
    
while (btnContainer.firstChild) {
    btnContainer.removeChild(btnContainer.firstChild);
}

for (var i = 0; i < citiesParsed.length; i++) {
    var city = citiesParsed[i]
    var liEl = document.createElement("li")
    var btnEl = document.createElement("button")
    btnEl.setAttribute("value", city)
    btnContainer.appendChild(liEl) 
        liEl.appendChild(btnEl)
        btnEl.textContent = city
    }      
 
    callWeather()
}

// user clicked a previously searched button
function saveButtons (e) {
    e.stopPropagation()
    var userSaveClicked = e.target
    reSearch = userSaveClicked.value
    callWeather()
}

// series of functions that request and process that data for the city provide ?? cant get 

    
// function that fetches the api information
function callWeather() {
console.log("usercity " + usercity)
    if (usercity) {
        var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + usercity + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"
    } else {
        var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + reSearch + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"    
    }
  fetch(api)
    
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        
        // clear out car filed
        // while (wContainer.firstChild) {
        //     wContainer.removeChild(wContainer.firstChild);
        // }
        // each day will have city name, the date, an icon representation of weather, temperature, humidity, wind speed
        for (var i = 6; i < data.list.length; i+=8) {
            var cardDiv = document.createElement("div")
            cardDiv.setAttribute("id", "cardDiv")
            var cardHead = document.createElement("h2")

            var iconCode = data.list[i].weather[0].icon
            // weather api site gives this website for icons but do I need to add it as a resource because Ive only gotten it to print on the page??? if I use it in the browser it takes me to an image???
            var icon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
            
            var cardIcon = document.createElement("i")
            cardIcon.setAttribute("src", icon)

            var temp = document.createElement("p")
            var wind = document.createElement("p")
            var humidity = document.createElement("p")

            cardHead.textContent = data.list[i].dt_txt
            temp.textContent = data.list[i].main.temp
            wind.textContent = data.list[i].wind.speed
            humidity.textContent = data.list[i].main.humidity
            
            wContainer.append(cardDiv)
            cardDiv.append(cardHead)
            cardDiv.append(cardIcon)
            cardDiv.append(temp)
            cardDiv.append(wind)
            cardDiv.append(humidity)
        
    }
         
   });  


  var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + usercity + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"

  fetch(apiCurrent)
    
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        
        var curDiv = document.createElement("div")
        curDiv.setAttribute("id", "curDiv")
        var curHead = document.createElement("h1")
        var curDate = document.createElement("span")

        var curICode = data.weather[0].icon
        var curI = "http://openweathermap.org/img/wn/" + curICode + "@2x.png"
        var curIcon = document.createElement("i")
        curIcon.setAttribute("src", curI)

        var curTemp = document.createElement("p")
        var curWind = document.createElement("p")
        var curHumidity = document.createElement("p")
        
        curHead.textContent = data.name
        curDate.textContent = data.dt_txt
        console.log(data)
        console.log(data.dt_txt)
        curTemp.textContent = data.main.temp
        curWind.textContent = data.wind.speed
        curHumidity.textContent = data.main.humidity

        wContainer.append(curDiv)
        curDiv.append(curHead)
        curHead.append(curDate)
        curDiv.append(curIcon)
        curDiv.append(curTemp)
        curDiv.append(curWind)
        curDiv.append(curHumidity)
        
        
        
        
   });  
}

// when the user types in the city they are looking for the input box will shift and the page will then be shared with the requested information
     
    // A: need the browser to listen for the click so that it can run two functions one for saving the city names and dynamically creating the list of previously searched cities and the other to run a series of functions like the request for the api search and translation of data retrieval. 
    form.addEventListener("submit", processClick)

    btnContainer.addEventListener("click", saveButtons)




    



