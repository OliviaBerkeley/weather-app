//define city variable with a default city
let city = "Dallas";
//define apiRoot
let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
//define apiKey
let apiKey = "7089a113b279137568bbbe6f86ce8c1f";
//define units
let units = "imperial";
let temp;
let feelsLike;
//calls searchCity at page load with default city location
searchCity();
//create full apiURL inside a function, call axius to get the api response

document.querySelector("#search-form").addEventListener("submit", querySearch);
function querySearch(event) {
  event.preventDefault();
  city = document.querySelector("#search-input").value;
  searchCity();
}
function handleLocation(lat, lon) {
  let apiUrl = `${apiRoot}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(handleResponse);
}
function getLocation(event) {
  //define city variable with a default city
  let city = "Dallas";
  //define apiRoot
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  //define apiKey
  let apiKey = "7089a113b279137568bbbe6f86ce8c1f";
  //define units
  let units = "imperial";
  let temp;
  let feelsLike;

  //calls searchCity at page load with default city location
  searchCity();
  //create full apiURL inside a function, call axius to get the api response

  document
    .querySelector("#search-form")
    .addEventListener("submit", querySearch);
  function querySearch(event) {
    event.preventDefault();
    city = document.querySelector("#search-input").value;
    searchCity();
  }
  function handleLocation(lat, lon) {
    let apiUrl = `${apiRoot}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(forecastUrl).then(showForecast);
  }
  function getLocation(event) {
    event.preventDefault();
    function handlePosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      handleLocation(lat, lon);
    }
    navigator.geolocation.getCurrentPosition(handlePosition);
  }

  document
    .querySelector("#location-button")
    .addEventListener("click", getLocation);
  //create event listener for current location button
  //Location button triggers getLocation which gets the lat & lon
  //create function that recreates the apiUrl
  //call axios using the new apiUrl and then handleResponse

  function searchCity() {
    let apiUrl = `${apiRoot}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse);
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(forecastUrl).then(showForecast);
    console.log(forecastUrl);
  }

  function showForecast(response) {
    console.log(response);
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    let forecastTime = newTime;
    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
    <div class="col forecast">
      <h4 class=forecast-time>
      ${forecastTime.format(forecast.dt * 1000)}
      </h4>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
       <p class="forecast-temp"> ↑<span class="max high-temp">
          ${Math.round(forecast.main.temp_max)}
        </span>°
        <span class="low">↓</span><span class="min low-temp">${Math.round(
          forecast.main.temp_min
        )}</span><span class="degrees">°</span>
      </p>
    </div>
  `;
    }
  }
  //Create function that breaks down the api's response and adjusts your html using selectors
  function handleResponse(response) {
    console.log(response);
    //Adjust city name from response
    document.querySelector(".header h1").innerHTML = response.data.name;
    //Adjust current temp from response
    temp = Math.round(response.data.main.temp);
    let tempSelector = document.querySelector("#celsius-fahrenheit");
    tempSelector.innerHTML = temp;
    //Adjust feels-like temp from response
    feelsLike = Math.round(response.data.main.feels_like);
    let feelsLikeSelector = document.querySelector("#feels-like");
    feelsLikeSelector.innerHTML = feelsLike;
    //Adjust weather description from response
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.querySelector(
      "#clouds"
    ).innerHTML = `<i class="fas fa-cloud weather-icon"></i> Cloud cover | ${response.data.clouds.all}%`;

    document.querySelector(
      "#humidity"
    ).innerHTML = `<i class="fas fa-water weather-icon"></i>  Humidity | ${response.data.main.humidity}%`;
    //Adjust wind from response
    document.querySelector(
      "#wind"
    ).innerHTML = `<i class="fas fa-wind weather-icon"></i>  Wind  |  ${Math.round(
      response.data.wind.speed
    )} mph`;
  }

  function displayCelsius(event) {
    event.preventDefault();
    if (fahrenheitLink.classList.contains("active")) {
      celsiusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
      let feelsLikeConversion = document.querySelector("#feels-like");
      let displayCel = document.querySelector("#celsius-fahrenheit");
      let fToC = Number(displayCel.innerHTML);
      fToC = Math.round(((fToC - 32) * 5) / 9);
      displayCel.innerHTML = `${fToC}`;
      feelsLikeConversion.innerHTML = `${Math.round(
        ((feelsLike - 32) * 5) / 9
      )}`;

      let maxElement = document.querySelectorAll(".high-temp");
      let minElement = document.querySelectorAll(".low-temp");
      maxElement.forEach(function (max) {
        let currentTemp = max.innerHTML;
        max.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}`;
      });
      minElement.forEach(function (min) {
        let currentTemp = min.innerHTML;
        min.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}`;
      });
    }
  }

  function displayFahrenheit(event) {
    event.preventDefault();
    if (celsiusLink.classList.contains("active")) {
      fahrenheitLink.classList.add("active");
      celsiusLink.classList.remove("active");
      let feelsLikeFahr = document.querySelector("#feels-like");
      let displayFahr = document.querySelector("#celsius-fahrenheit");
      displayFahr.innerHTML = temp;
      feelsLikeFahr.innerHTML = feelsLike;
      let maxElement = document.querySelectorAll(".high-temp");
      let minElement = document.querySelectorAll(".low-temp");
      maxElement.forEach(function (max) {
        let currentTempHigh = max.innerHTML;
        max.innerHTML = `${Math.round((currentTempHigh * 9) / 5 + 32)}`;
      });
      minElement.forEach(function (min) {
        let currentTempLow = min.innerHTML;
        min.innerHTML = `${Math.round((currentTempLow * 9) / 5 + 32)}`;
      });
    }
  }

  let celsiusLink = document.querySelector("#cel-link");
  celsiusLink.addEventListener("click", displayCelsius);

  let fahrenheitLink = document.querySelector("#fahr-link");
  fahrenheitLink.addEventListener("click", displayFahrenheit);

  //Date section - do not touch! Don't even breathe!
  let now = new Date();
  let day = now.getDay();
  let newTime = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
  });

  function changeDate() {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let currentDay = days[day];
    let currentHour = newTime;

    let date = document.querySelector("#date");
    date.innerHTML = `${currentDay}, ${currentHour.format(Date.now())}`;
  }

  changeDate();

  //Do not change code above this line!!!

  event.preventDefault();
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    handleLocation(lat, lon);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
document
  .querySelector("#location-button")
  .addEventListener("click", getLocation);
//create event listener for current location button
//Location button triggers getLocation which gets the lat & lon
//create function that recreates the apiUrl
//call axios using the new apiUrl and then handleResponse

function searchCity() {
  let apiUrl = `${apiRoot}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(handleResponse);
}
//Create function that breaks down the api's response and adjusts your html using selectors
function handleResponse(response) {
  //Adjust city name from response
  document.querySelector(".header h1").innerHTML = response.data.name;
  //Adjust current temp from response
  temp = Math.round(response.data.main.temp);
  let tempSelector = document.querySelector("#celsius-fahrenheit");
  tempSelector.innerHTML = temp;
  //Adjust feels-like temp from response
  feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeSelector = document.querySelector("#feels-like");
  feelsLikeSelector.innerHTML = feelsLike;
  //Adjust weather description from response
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  //Adjust precipitation from response
  //Adjust humidity from response
  //Adjust wind from response
}

function displayCelsius(event) {
  event.preventDefault();
  if (fahrenheitLink.classList.contains("active")) {
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let feelsLikeConversion = document.querySelector("#feels-like");
    let displayCel = document.querySelector("#celsius-fahrenheit");
    let fToC = Number(displayCel.innerHTML);
    fToC = Math.round(((fToC - 32) * 5) / 9);
    displayCel.innerHTML = `${fToC}`;
    feelsLikeConversion.innerHTML = `${Math.round(((feelsLike - 32) * 5) / 9)}`;
  }
}
function displayFahrenheit(event) {
  event.preventDefault();
  if (celsiusLink.classList.contains("active")) {
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let feelsLikeFahr = document.querySelector("#feels-like");
    let displayFahr = document.querySelector("#celsius-fahrenheit");
    displayFahr.innerHTML = temp;
    feelsLikeFahr.innerHTML = feelsLike;
  }
}

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

//Date section - do not touch! Don't even breathe!
let now = new Date();
let day = now.getDay();
let newTime = new Intl.DateTimeFormat("en", {
  timeStyle: "short",
});

function changeDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[day];
  let currentHour = newTime;

  let date = document.querySelector("#date");
  date.innerHTML = `${currentDay}, ${currentHour.format(Date.now())}`;
}

changeDate();

//Do not change code above this line!!!
