var userCityField = document.getElementById('userCity')
var getWeather = document.getElementById('getWeather')
var btnContainer = document.getElementById('btnContainer')
var form = document.getElementById('form')
var wContainer = document.getElementById('wContainer')
var wCurContainer = document.getElementById('wCurContainer')
var usercity;
var reSearch
var cities = [];
var storedCities = localStorage.getItem("cities")
var citiesParsed = JSON.parse(storedCities)
console.log(citiesParsed)
// buttons showing that are in local storage
function buttonDisplay() {
    if (!citiesParsed){
        return;
    }
    for (var i = 0; i < citiesParsed.length; i++) {
        var city = citiesParsed[i]
        var liEl = document.createElement("li")
        liEl.setAttribute("class", "list-group-item")
        var btnEl = document.createElement("button")
        btnEl.setAttribute("value", city)
        btnContainer.appendChild(liEl) 
        liEl.appendChild(btnEl)
        btnEl.textContent = city
    }    

}
buttonDisplay()

// log city searched and generate buttons
function processClick (event) {
    event.preventDefault()
    usercity = userCityField.value
    userCityField.value = "" 
    cities.push(usercity)
   
    var citiesStringify = JSON.stringify(cities)
    localStorage.setItem("cities", citiesStringify)
    
// the users choice will go into a list of buttons that make up the users previously searched cities
// send to local storage first and then take for loop the array that comes out of local storage
    
    while (btnContainer.firstChild) {
        btnContainer.removeChild(btnContainer.firstChild);
    }   

    storedCities = localStorage.getItem("cities")
    citiesParsed = JSON.parse(storedCities)

    for (var i = 0; i < citiesParsed.length; i++) {
        var city = citiesParsed[i]
        var liEl = document.createElement("li")
        liEl.setAttribute("class", "list-group-item")
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
    usercity = undefined
    callWeather(usercity)
    console.log(reSearch)
}
    
// function that fetches the api information
function callWeather() {
console.log("usercity " + usercity)
console.log(usercity === undefined)
    if (usercity === undefined) {
        var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + reSearch + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"
        
    } else {
        var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + usercity + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"   
    }

  fetch(api)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data)
        // clear out var filed
        while (wContainer.firstChild) {
            wContainer.removeChild(wContainer.firstChild);
        }
        // each day will have city name, the date, an icon representation of weather, temperature, humidity, wind speed
        for (var i = 6; i < data.list.length; i+=8) {
            var cardDiv = document.createElement("div")
            cardDiv.setAttribute("id", "cardDiv")
            cardDiv.setAttribute("class", "col-12 col-sm-6 col-lg-4")
            var cardHead = document.createElement("h2")

            var iconCode = data.list[i].weather[0].icon
            var icon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"

            var cardIcon = document.createElement("img")
            cardIcon.setAttribute("src", icon)

            var temp = document.createElement("p")
            var wind = document.createElement("p")
            var humidity = document.createElement("p")

            var d = data.list[i].dt_txt
            var dates = dayjs(d).format('MM/DD/YYYY')
            cardHead.textContent = dates
            temp.textContent = "Temp: " + Math.round(data.list[i].main.temp) + "F°"
            
            wind.textContent = "Wind: " + data.list[i].wind.speed
            humidity.textContent = "Humidity: " + data.list[i].main.humidity
            
            wContainer.append(cardDiv)
            cardDiv.append(cardHead)
            cardDiv.append(cardIcon)
            cardDiv.append(temp)
            cardDiv.append(wind)
            cardDiv.append(humidity)
        
    }
         
   });  


  
if (usercity === undefined) {
        
        var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + reSearch + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"
    } else {
        var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + usercity + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"  
    }
  fetch(apiCurrent)
    
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
         // clear out var filed
        while (wCurContainer.firstChild) {
            wCurContainer.removeChild(wCurContainer.firstChild);
        }
        var curDiv = document.createElement("div")
        curDiv.setAttribute("id", "curDiv")
        var curHead = document.createElement("h1")
        var curDate = document.createElement("span")

        var curICode = data.weather[0].icon
        var curI = "http://openweathermap.org/img/wn/" + curICode + "@2x.png"
        var curIcon = document.createElement("img")
        curIcon.setAttribute("src", curI)

        var curTemp = document.createElement("p")
        var curWind = document.createElement("p")
        var curHumidity = document.createElement("p")
        
        curHead.textContent = data.name + " "
        var dt = data.dt_txt
        var datest = dayjs(dt).format('MM/DD/YYYY')
        curDate.textContent = datest
        curTemp.textContent = "Temp: " + Math.round(data.main.temp) + "F°"
        curWind.textContent = "Wind: " + data.wind.speed
        curHumidity.textContent = "Humidity: " + data.main.humidity

        wCurContainer.append(curDiv)
        curDiv.append(curHead)
        curHead.append(curDate)
        curDiv.append(curIcon)
        curDiv.append(curTemp)
        curDiv.append(curWind)
        curDiv.append(curHumidity)
       
   });  
}
     
// browser to listen for the click so that it can run two functions one for saving the city names and dynamically creating the list of previously searched cities and the other to run a series of functions like the request for the api search and translation of data retrieval. 
form.addEventListener("submit", processClick)

// listens for previously saved buttons to be clicked
btnContainer.addEventListener("click", saveButtons)




    



