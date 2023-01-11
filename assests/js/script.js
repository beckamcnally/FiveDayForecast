var userCityField = document.getElementById('userCity')
var getWeather = document.getElementById('getWeather')
var btnContainer = document.getElementById('btnContainer')
var form = document.getElementById('form')
var wContainer = document.getElementById('wContainer')
var usercity;
var cities = [];




// log city searched and generate 
function processClick (event) {
    event.preventDefault()
    usercity = userCityField.value
    userCityField.textContent = "" // didnt work
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
    btnContainer.appendChild(liEl) 
        liEl.appendChild(btnEl)
        btnEl.textContent = city
    }      
// } 
    callWeather(usercity)
}
// when the user types in the city they are looking for the input box will shift and the page will then be shared with the requested information
     
    // A: need the browser to listen for the click so that it can run two functions one for saving the city names and dynamically creating the list of previously searched cities and the other to run a series of functions like the request for the api search and translation of data retrieval. 
    form.addEventListener("submit", processClick)
// series of functions that request and process that data for the city provide
// weather data can be obtained in JSON
     // Step 
    // Q: What are you going to do?
    // A: create a fetch request for the data
    // Q: How are you going to do it?
    // A: using the built in fetch method
    // Q: Why are you going to do it?
    // A: so that I can retrieve the data from the OpenWeather API
    
// function that fetches the api information
function callWeather() {
  var api = "https://api.openweathermap.org/data/2.5/forecast?q=" + usercity + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"

  fetch(api)
    
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data)
        for (var i = 6; i < data.list.length; i+=8) {
            var cardDiv = document.createElement("div")
            cardDiv.setAttribute("id", "cardDiv")
            var cardHead = document.createElement("h2")
            var iconCode = data.list[i].weather[0].icon
            var icon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
            var cardIcon = document.createElement("i")
            cardIcon.setAttribute("src", icon)
            var temp = document.createElement("p")
            var wind = document.createElement("p")
            var humidity = document.createElement("p")

            cardHead.textContent = data.list[i].dt_txt
            temp.textContent = data.list[i].main.temp
            wind.textContent = data.list[i].wind.speed
            console.log(humidity.textContent = data.list[i].main.humidity)
            

            wContainer.append(cardDiv)
            cardDiv.append(cardHead)
            cardDiv.append(cardIcon)
            cardDiv.append(temp)
            cardDiv.append(wind)
            cardDiv.append(humidity)

console.log("date " + data.list[i].dt_txt);
        
        
         console.log(data.list[i].weather[0].icon); 
        // console.log("temp " + data.list[0].main.temp);
        // console.log("wind " + data.list[0].wind.speed);
        // console.log("humidity " + data.list[0].main.humidity);
    }
         
   });  


  var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + usercity + "&appid=831d578d1e311567a319b8a0576c71e4&units=imperial"

  fetch(apiCurrent)
    
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log("whatever")
        var curDiv = document.createElement("div")
        var curHead = document.createElement("h2")
        var curIcon = document.createElement("i")
        var curUl = document.createElement("ul")
        var curLi = document.createElement("li")
        // console.log(data)
        // console.log("name " + data.name);
        // console.log("date " + data.dt_txt); // ?? need to check this one
        // // console.log(data.weather[0]).icon; does not like the icon for some reason
        // console.log("temp " + data.main.temp);
        // console.log("wind " + data.wind.speed);
        // console.log("humidity " + data.main.humidity);
        
   });  
}

// the requested information will be broken into two parts - the current days forecast and the next five day
     // Step 
    // Q: What are you going to do?
    // A: dynamically generate a table 
    // Q: How are you going to do it?
    // A: with a for loop
    // Q: Why are you going to do it?
    // A: so that the information is easily readable for the user

// each day will have city name, the date, an icon representation of weather, temperature, humidity, wind speed
     // Step 
    // Q: What are you going to do?
    // A: locate the information with in the api results 
    // Q: How are you going to do it?
    // A: looking through the result
    // Q: Why are you going to do it?
    // A: so that i can see how the data is organized



    

    // Step 
    // Q: What are you going to do?
    // A: 
    // Q: How are you going to do it?
    // A:
    // Q: Why are you going to do it?
    // A:

