let city = "Tacoma";
let units = "imperial";
let apiKey = "7089a113b279137568bbbe6f86ce8c1f";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
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

function changeTemp(event) {
  event.preventDefault();
  if (document.form1.radio1[0].checked === true) {
    let heading = document.querySelector("#celsius-fahrenheit");
    heading.innerHTML = "70°F";
  } else if (document.form1.radio1[1].checked === true) {
    let heading = document.querySelector("#celsius-fahrenheit");
    heading.innerHTML = "10°C";
  } else {
  }
}
let radioButton = document.querySelector("#radioOption");
radioButton.addEventListener("click", changeTemp);

///////////
///////////

function changeCity(event) {
  event.preventDefault();
  city = document.querySelector("#search-input").value;
  searchCityUrl();
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", changeCity);

function showCurrentLocation(response) {
  let showCity = document.querySelector("h1");
  let currentTemp = document.querySelector("#celsius-fahrenheit");
  let showCurrentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  showCity.innerHTML = `${currentCity}`;
  currentTemp.innerHTML = `${showCurrentTemp}°`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "imperial";
  let apiKey = "7089a113b279137568bbbe6f86ce8c1f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let yourLocation = document.querySelector("#location-button");
yourLocation.addEventListener("click", getPosition);

function searchCityUrl() {
  let searchCityUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(searchCityUrl).then(showCurrentLocation);
}
searchCityUrl();
