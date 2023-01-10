// 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'


    


    // Step 
    // Q: What are you going to do?
    // A: use local storage to save the data
    // Q: How are you going to do it?
    // A:
    // Q: Why are you going to do it?
    // A:


// user can choose for their list of previously searched cities to display.
// when you open the page there will be a header, in the center of the page there will be a text box with a label of enter the city that you would like to see the weather for and a submit button
// Step 
    // Q: What are you going to do?
    // A: collect the users input 
    // Q: How are you going to do it?
    // A: save it to a var (userInput)
    // Q: Why are you going to do it?
    // A: for future use with the city location and list of previously searched cities
    
// when the user types in the city they are looking for the input box will shift and the page will then be shared with the requested information
     // Step 
    // Q: What are you going to do?
    // A: add an event listener for the submit button
    // Q: How are you going to do it?
    // A: using js
    // Q: Why are you going to do it?
    // A: need the browser to listen for the click so that it can run two functions one for saving the city names and dynamically creating the list of previously searched cities and the other to run a series of functions like the request for the api search and translation of data retrieval. 



// the requested information will be broken into two parts - the current days forcast and the next five day
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


// the users choice will go into a list of buttons that make up the users previously searched cities
    // Step 
    // Q: What are you going to do?
    // A: dynamically create event listeners for the new buttons
    // Q: How are you going to do it?
    // A: if the for loop that creates the buttons i will add a dynamically created event listener
    // Q: Why are you going to do it?
    // A: so that each time a button is clicked the series of functions for the search will begin