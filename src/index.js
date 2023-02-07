function searchCity(city) {
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // let apiKey = "2dd376b7c0fd3b8dd3740tf2o9dd2af4";
  // let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=2dd376b7c0fd3b8dd3740tf2o9dd2af4&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function displayWeatherCondition(response) {
  let descriptionElement = document.querySelector("#description");
  // let degree = document.querySelector(".temperature");
  // let celcius = Math.round(response.data.main.temp);
  // degree.innerHTML = celcius;
  let cityElement = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  // wind.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  // cityElement.innerHTML = `${response.data.name}`;
  // cityElement.innerHTML = searchCity;
  // cityElement.innerHTML = searchLocation;
  // let cityInput = document.querySelector("#city-input");
  let iconElement = document.querySelector("#imageid");

  descriptionElement.innerHTML = response.data.weather[0].description;

  windElement.innerHTML = Math.round(response.data.wind.speed);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  // cityElement.innerHTML = cityInput.value;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    // `http://shecodes-assets.s3.amazonaws.com/api/weather/${response.condition.icon}`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${response.coordinates.latitude}&lon=${response.coordinates.longitude}&key=2dd376b7c0fd3b8dd3740tf2o9dd2af4&units=metric`;

  // axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiUrl).then(showtemp);
}
function showtemp(response) {
  let celcius = Math.round(response.data.main.temp);
  let nameofcity = response.data.name;
  let degree = document.querySelector(".temperature");
  // degree.innerHTML = temp;
  degree.innerHTML = celcius;
  let cityShow = document.querySelector("#city");
  cityShow.innerHTML = nameofcity;
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayIndex = date.getDay();
  let day = days[dayIndex];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `
  ${day}, ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#currentTime");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Weather forecast

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `2dd376b7c0fd3b8dd3740tf2o9dd2af4`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecastDays(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function displayForecast(response) {
  let weeklyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastElement = `<div class="row">`;
  weeklyForecast.forEach(function (day, index) {
    if (index < 7 && index != 0) {
      let iconUrl = day.condition.icon_url;
      let max = Math.round(day.temperature.maximum);
      let min = Math.round(day.temperature.minimum);
      forecastElement =
        forecastElement +
        `
    <div class="col-2">
               <div class="forecast-Date"> ${displayForecastDays(
                 day.time * 1000
               )} </div>
                <img src="${iconUrl}" width="30px">
               <div class="forecast-temperature"><span class="forecast-temperature-max">${max}°</span><span class="forecast-temperature-min">|${min}°</span></div>
              </div>`;
    }
  });
  forecastElement = forecastElement + `</div>`;
  forecast.innerHTML = forecastElement;
}
//unit conversion

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#temperature");
  let Fahrenheit = celcius * 1.8 + 32;
  fahrenheitTemperature.innerHTML = Math.round(Fahrenheit);
}

function displayCelsius(event) {
  event.preventDefault();
  let celciusTemperature = document.querySelector("#temperature");
  celciusTemperature.innerHTML = celcius;
}

let celcius = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
searchCity("Amsterdam");
