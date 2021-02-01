// Variables
var userFormEl = document.getElementById("user-form");
var cityNameInput = document.getElementById("city-name");
var submitBtn = document.getElementById("submit");
let fiveDays = document.getElementById("five-days");
var btn = document.querySelector(".btn");

// Fetch Weather API

// to Capture search data from user with form handler
let formHandler = function (event) {
  event.preventDefault();

  // Get Value from input element
  let cityName = cityNameInput.value.trim();

  if (cityName) {
    getcityForecast(cityName);
  } else {
    alert("Please enter a city name");
  }
};

// Use search data to show current and future conditions for the city searched, search is added to search history

var getcityForecast = function (cityName) {
  // format the url

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=93bc7ce0f6c148d2b60cb17b2f7a02b1&units=imperial";

  // Make request from Url

  // five day
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayForecast(data, cityName);
    });

  //getUVIndex(data);
  var currentWeatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=93bc7ce0f6c148d2b60cb17b2f7a02b1&units=imperial";

  // current Day
  fetch(currentWeatherApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      setCurrentDayWeather(data, cityName);
    });
};

// Each city should show city name, date icon, rep of weather conditions, temp, humidity wind speed UV index

var setCurrentDayWeather = function (data, cityName) {
  var weatherInfo = document.getElementById("weather-current");
  weatherInfo.innerHTML = "";

  var header = document.createElement("h1");
  header.innerHTML = "Current Weather for " + cityName;
  weatherInfo.append(header);

  var humidity = data.main.humidity;
  var humidityP = document.createElement("p");
  humidityP.innerHTML = "Humidity: " + humidity;
  weatherInfo.append(humidityP);

  var temp = data.main.temp;
  var tempP = document.createElement("p");
  tempP.innerHTML = "temperature: " + temp;
  weatherInfo.append(tempP);

  var temperature = data.main.temperature;
  var temperatureP = document.createElement("p");
  temperatureP.innerHTML = "temperature: " + temperature;
  weatherInfo.append(temperatureP);

  var pressure = data.main.pressure;
  var pressureP = document.createElement("p");
  pressureP.innerHTML = "pressure: " + pressure;
  weatherInfo.append(pressureP);

  var windspeed = data.wind.speed;
  var windspeedP = document.createElement("p");
  windspeedP.innerHTML = "windspeed: " + windspeed;
  weatherInfo.append(windspeedP);

  let uvindexId = "uvIndexCurrentDay";
  getUVIndex(data.coord.lat, data.coord.lon, uvindexId);
  var uvindexP = document.createElement("p");
  uvindexP.id = uvindexId;
  uvindexP.innerHTML = "";
  weatherInfo.append(uvindexP);
};

var fiveDayForecast = function (data, cityName) {
  var weatherFuture = document.getElementById("weather-future");
  weatherFuture.innerHTML = "";

  var header = document.createElement("h1");
  header.innerHTML = "Future Weather forecast for " + cityName;
  weatherFuture.append(header);

  for (var i = 0; i < data.list.length; i++) {
    var subHeader = document.createElement("h3");
    subHeader.innerHTML = "Day " + (i + 1);
    weatherFuture.append(subHeader);

    var humidity = data.list[i].main.humidity;
    var humidityP = document.createElement("p");
    humidityP.innerHTML = "humidity" + humidity;
    weatherFuture.append(humidityP);

    var temp = data.list[i].main.temp;
    var tempP = document.createElement("p");
    tempP.innerHTML = "temperature: " + temp;
    weatherFuture.append(tempP);

    var temperature = data.list[i].main.temperature;
    var temperatureP = document.createElement("p");
    temperatureP.innerHTML = "temperature: " + temperature;
    weatherFuture.append(temperatureP);

    var pressure = data.list[i].main.pressure;
    var pressureP = document.createElement("p");
    pressureP.innerHTML = "pressure: " + pressure;
    weatherFuture.append(pressureP);

    var windspeed = data.list[i].wind.speed;
    var windspeedP = document.createElement("p");
    windspeedP.innerHTML = "windspeed: " + windspeed;
    weatherFuture.append(windspeedP);

    let uvindexId = "uvIndexFuture" + i;
    getUVIndex(data.city.coord.lat, data.city.coord.lon, uvindexId);
    var uvindexP = document.createElement("p");
    uvindexP.id = uvindexId;
    uvindexP.innerHTML = "";
    weatherFuture.append(uvindexP);
  }
};

var getUVIndex = function (lat, lon, divId) {
  var uvIndexApi =
    "http://api.openweathermap.org/data/2.5/uvi?&appid=93bc7ce0f6c148d2b60cb17b2f7a02b1&units=imperial&lat=" +
    lat +
    "&lon=" +
    lon;

  fetch(uvIndexApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setUvIndex(divId, data.value);
    });
};

var setUvIndex = function (divId, uvValue) {
  var uvIndexP = document.getElementById(divId);
  uvIndexP.innerHTML = "uvindex: " + uvValue;
};

// Add Event Listener
submitBtn.addEventListener("click", formHandler);

// submitBtn.addEventListener("click", fiveDayForecast);

// submitBtn.addEventListener("click", getUVIndex);

// var arr = ['James', 'John', "Jacob", 'Daniel', 'Dave'];
// for (var i = 0; i < arr.length; i = i + 2) {
//     console.log(i)
