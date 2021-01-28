// Variables
var userFormEl = document.getElementById("user-form")
var cityNameInput = document.getElementById("city-name");
var submitBtn = document.getElementById("submit");
let fiveDays=document.getElementById("five-days")
var btn = document.querySelector(".btn")

// Fetch Weather API

//Capture search data from user with form handler
let formHandler = function(event) {
    event.preventDefault();


// Get Value from input element
let cityName = cityNameInput.value.trim();

if (cityName) {
    getcityForecast(cityName);
} else {
    alert("Please enter a city name");
}
}






