// API_KEY for maps api
let API_KEY = config.MY_KEY; // Replace this value with your API key, Ex API_KEY = '245sdkh43k32k245m32k2324j5j'
// Search for weather if 'search' button was clicked or ENTER button was pressed and field is not empty
window.onload = function (){
  let input = document.getElementById("city-input");
  input.addEventListener("keyup", function(event) {
    if (event.key == 'Enter' && input.value != ""){
      searchCity();
    }
 });

 // For current location data and by default showing weather at current location
 navigator.geolocation.getCurrentPosition(currentLocationData);
}

/**
 * Retrieve weather data from openweathermap
*/
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";

  let completeURL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`; // metric for Celsius
  let weatherDataPromise = fetch(completeURL);
  return weatherDataPromise.then(response => {
    return response.json();
  })

}

/**
 * Retrieve city input and get the weather data
 */
searchCity = () => {
  const city = document.getElementById('city-input').value;
  
  if(city !=""){
    let jsonObject = getWeatherData(city);
    jsonObject.then(response => {
      showWeatherData(response);
    }).catch(error => console.log(error))
  }
}

currentLocationData = (position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  let weatherPromise = fetch(URL);
  weatherPromise.then( response => {return response.json()})
  .then(response => {
      showWeatherData(response);
  }).catch(error => console.log(error));
}
/**
 * Show the weather data in HTML
 */
showWeatherData = (weatherData) => {
  
  let iconElement = document.getElementById('weather-icon');
  const iconName = weatherData.weather[0].icon;
  //let srcURL = `icons/${iconName}.png`;
  // ICON URL example: http://openweathermap.org/img/wn/10d@2x.png
  let srcURL = `http://openweathermap.org/img/wn/${iconName}@2x.png`;
  let imgTag = `<img src=${srcURL}>`
  iconElement.innerHTML = imgTag;
  //console.log(weatherData);
  document.getElementById('city-name').innerText = weatherData.name;
  document.getElementById('weather-type').innerText = weatherData.weather[0]['description'];
  document.getElementById('temp').innerText = weatherData.main.temp + " ";
  document.getElementById('feels-like').innerText = weatherData.main.feels_like + " ";
  document.getElementById('lowest-temp').innerText = weatherData.main.temp_min + " ";
  document.getElementById('highest-temp').innerText = weatherData.main.temp_max + " "; 
}