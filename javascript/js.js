/* global variables */
let cityName = document.getElementById("city");
let searchButton = document.getElementById("find-btn");
let weatherData =[];
let weatherForecastDays = [];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

async function getWeatherData(city, noOfDays){
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=de620b966595424f84a195303231902&q=${city}&days=${noOfDays}`);
    weatherData = await apiResponse.json();
    weatherForecastDays = weatherData.forecast.forecastday;
    displayData();
}

searchButton.addEventListener("click",function(){
  getWeatherData(cityName.value, 2)
})

cityName.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    searchButton.click();
  }
});

function getDayName(curdate){
  const d = new Date(curdate);
  const dayName = days[d.getDay()];
  console.log(dayName);
  return dayName;
}
function getMonthName(curdate){
  const d = new Date(curdate);
  let date = `${d.getDate()} ${month[d.getMonth()]}`;
  console.log(date);
  return date;
}

function displayData(){
  let htmlData = `
  <div class="col-md-4">
  <div class="card text-bg-dark mb-3 border-0">
  <div class="card-header d-flex justify-content-between fs-6 text-white-50">
  <span>${getDayName(weatherData.location.localtime)}</span>
  <span>${getMonthName(weatherData.location.localtime)}</span>
  </div>
  <div class="card-body px-4 pt-4">
              <h5 class="card-title text-white-50">${weatherData.location.name}</h5>
              <div class="weather-degree">
              <span>${weatherData.current.temp_c}&#8451</span>
              <img src="${weatherData.current.condition.icon}" alt="conition-image">
              </div>
            </div>
            <div class="card-footer border-0 pb-4 text-white-50">
            <span class="text-primary text-info fs-6">${weatherData.current.condition.text}</span>
              <div class="weather-details d-flex justify-content-start mt-3">
                <div class="pressure me-4">
                  <img src="./images/icon-umberella.png" alt="">
                  <span>${weatherData.current.wind_degree}%</span>
                  </div>
                  <div class="wind-speed me-4">
                  <img src="./images/icon-wind@2x.png" alt="">
                  <span>${weatherData.current.wind_kph} km/h</span>
                  </div>
                  <div class="wind-direction">
                  <img src="./images/icon-compass.png" alt="">
                  <span>${weatherData.current.wind_dir}</span>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  `;
                  
                  for (let i=0;i<weatherForecastDays.length;i++){
        htmlData+=`
        <div class="col-md-4">
        <div class="card text-bg-dark mb-3 border-0 text-center">
          <div class="card-header fs-6 text-white-50 ">
            <span>${getDayName(weatherForecastDays[i].date)}</span>
            </div>
          <div class="card-body px-4 pt-5">
          <img src="${weatherForecastDays[i].day.condition.icon}" alt="forecast-icon">
          <span class="d-block mt-4 fw-bolder">${weatherForecastDays[i].day.maxtemp_c}&#8451</span>
          <span class="d-block fs-6 text-white-50">${weatherForecastDays[i].day.mintemp_c}&#8451</span>
          <span class="d-block text-primary text-info fs-6 mt-3">${weatherForecastDays[i].day.condition.text}</span>
          </div>
          </div>
      </div>
    `
  }
  document.getElementById("weatherData").innerHTML = htmlData;
}

getWeatherData("cairo", 2);
  