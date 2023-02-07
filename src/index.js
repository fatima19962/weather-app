function searchCity(city) {
  let apiKey = "06f890ecc77e50e91e6cc5ecb6c1a936";
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
  // let temperatureElement = document.querySelector("#temperature");

  let descriptionElement = document.querySelector("#description");
  // let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let iconElement = document.querySelector("#imageid");
  // celsiusTemperature = response.data.main.temp;
  // celsiusTemperature = response.data.main.temp;

  // temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  // humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // dateElement.innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  // document.querySelector("#description").innerHTML =
  //   response.condition.description;

  cityElement.innerHTML = cityInput.value;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    // `http://shecodes-assets.s3.amazonaws.com/api/weather/${response.condition.icon}`
  );
  // iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "06f890ecc77e50e91e6cc5ecb6c1a936";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${response.coordinates.latitude}&lon=${response.coordinates.longitude}&key=2dd376b7c0fd3b8dd3740tf2o9dd2af4&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
searchCity("Sydney NSW");

// function formatDate(timestamp) {
//   let date = new Date(timestamp);
//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[date.getDay()];
//   return `${day} ${hours}:${minutes}`;
// }

// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let day = date.getDay();
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return days[day];
// }

// function displayForecast(response) {
//   let forecast = response.data.daily;

//   let forecastElement = document.querySelector("#forecast");

//   let forecastHTML = `<div class="row">`;
//   forecast.forEach(function (forecastDay, index) {
//     if (index < 6) {
//       forecastHTML =
//         forecastHTML +
//         `
//       <div class="col-2">
//         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
//         <img
//           src="http://openweathermap.org/img/wn/${
//             forecastDay.weather[0].icon
//           }@2x.png"
//           alt=""
//           width="42"
//         />
//         <div class="weather-forecast-temperatures">
//           <span class="weather-forecast-temperature-max"> ${Math.round(
//             forecastDay.temp.max
//           )}° </span>
//           <span class="weather-forecast-temperature-min"> ${Math.round(
//             forecastDay.temp.min
//           )}° </span>
//         </div>
//       </div>
//   `;
//     }
//   });

//   forecastHTML = forecastHTML + `</div>`;
//   forecastElement.innerHTML = forecastHTML;
// }

// function getForecast(coordinates) {
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayForecast);
// }

// function displayTemperature(response) {
//   let temperatureElement = document.querySelector("#temperature");
//   let cityElement = document.querySelector("#city");
//   let descriptionElement = document.querySelector("#description");
//   let humidityElement = document.querySelector("#humidity");
//   let windElement = document.querySelector("#wind");
//   let dateElement = document.querySelector("#date");
//   let iconElement = document.querySelector("#icon");

//   celsiusTemperature = response.data.main.temp;

//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
//   cityElement.innerHTML = response.data.name;
//   descriptionElement.innerHTML = response.data.weather[0].description;
//   humidityElement.innerHTML = response.data.main.humidity;
//   windElement.innerHTML = Math.round(response.data.wind.speed);
//   dateElement.innerHTML = formatDate(response.data.dt * 1000);
//   iconElement.setAttribute(
//     "src",
//     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//   );
//   iconElement.setAttribute("alt", response.data.weather[0].description);

//   getForecast(response.data.coord);
// }

// function search(city) {
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayTemperature);
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   let cityInputElement = document.querySelector("#city-input");
//   search(cityInputElement.value);
// }

// let form = document.querySelector("#search-form");
// form.addEventListener("submit", handleSubmit);

// search("New York");
