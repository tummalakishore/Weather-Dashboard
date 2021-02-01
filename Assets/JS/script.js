// Variables
var userFormEl = document.getElementById("user-form")
var cityNameInput = document.getElementById("city-name");
var submitBtn = document.getElementById("submit");
let fiveDays=document.getElementById("five-days")
var btn = document.querySelector(".btn")

// Fetch Weather API

// to Capture search data from user with form handler
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

// Use search data to show current and future conditions for the city searched, search is added to search history 

var getcityForecast = function(cityName) {

// format the url

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=93bc7ce0f6c148d2b60cb17b2f7a02b1&units=imperial"

// Make request from Url

// five day
    fetch(apiUrl).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
            fiveDayForecast(data);
            
            });

     //getUVIndex(data);
    
    var secondUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=93bc7ce0f6c148d2b60cb17b2f7a02b1&units=imperial"
    
    // current Day
    fetch(secondUrl).then(function(response) {
        return response.json()
    }).then(function(data) {
       // console.log(data)
            assignForecastData(data);
           
    });


}

// Each city should show city name, date icon, rep of weather conditions, temp, humidity wind speed UV index

var assignForecastData = function(data){
    var weatherInfo = document.getElementById('weather-info');

    var humidity = data.main.humidity;
    var humidityP = document.createElement('p');
    humidityP.innerHTML = "Humidity: " + humidity;    
    weatherInfo.append(humidityP);

    var temp = data.main.temp;
    var tempP = document.createElement('p');
    tempP.innerHTML = "temperature: " + temp;
    weatherInfo.append(tempP)

    var temperature = data.main.temperature;
    var temperatureP = document.createElement('p');
    temperatureP.innerHTML = "temperature: " + temperature;
    weatherInfo.append(temperatureP)

    var pressure = data.main.pressure;
    var pressureP = document.createElement('p');
    pressureP.innerHTML = "pressure: " + pressure;
    weatherInfo.append(pressureP)

    var windspeed = data.wind.speed;
    var windspeedP = document.createElement('p');
    windspeedP.innerHTML = "windspeed: " + windspeed;
    weatherInfo.append(windspeedP) 

console.log("lat", data.coord.lat)
    // getUVIndex(data.coord.lat, data.coord.lon)
}

var fiveDayForecast = function(data) {
let currentCity = data.city.name;
let degree= "&#176";
let currentHumidity = data.list[0].main.humidity;
let currentWind= Math.floor(data.list[0].wind.speed); 

console.log(currentCity)


for (var i=0; i < data.list.length; i = i + 8) {
    var humidity = data.list[i].main.humidity ;
    var humidityP = document.createElement('p');
    humidityP.innerHTML = "humidity" + humidity
    
    var weatherInfo = document.getElementById('weather-info');
    weatherInfo.append(humidityP)



}

}

var getUVIndex = function(lat, lon) {  
    
var thirdUrl = "http://api.openweathermap.org/data/2.5/uvi?&appid=93bc7ce0f6c148d2b60cb17b2f7a02b1&units=imperial&lat=" + lat + "&lon" + lon 
 
fetch(thirdUrl).then(function(response) {
    return response.json()
}).then(function(data) {
    console.log(data)
      
        
        });



}





// Add Event Listener
submitBtn.addEventListener("click", formHandler);  

submitBtn.addEventListener("click", fiveDayForecast);  

submitBtn.addEventListener("click", getUVIndex);



// var arr = ['James', 'John', "Jacob", 'Daniel', 'Dave'];
// for (var i = 0; i < arr.length; i = i + 2) {
//     console.log(i)

