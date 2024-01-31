$(document).ready(function () {
  // Define the saveToLocalStorage function
  function saveToLocalStorage(inputValue) {
    // Implementation of the function goes here
  }

  // Event handler for the button click
  $('#search-form').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the value from the input field
    let inputValue = $('#search-form .city').val();

    // Save the value to local storage and persist existing values
    localStorage.setItem('city', JSON.stringify(inputValue));
    

    // Pass the city input to the open weather API to get the lat and lon
    var locationqueryURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + inputValue + '&limit=5&appid=3b16f2fcebfa1cc98b2d860c9b974af8';

    // Fetch the location data
    fetch(locationqueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;

        // Now you can use the lat and lon values to fetch the weather data
        var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&exclude=hourley&appid=3b16f2fcebfa1cc98b2d860c9b974af8&units=metric';

        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (weatherData) {
            console.log(weatherData);

            // Display current weather information
            displayCurrentWeather(weatherData);

            // Save to local storage
            localStorage.setItem('weather', JSON.stringify(weatherData));

            // Fetch 5-day forecast data using lat and lon
            var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&exclude=hourley&appid=3b16f2fcebfa1cc98b2d860c9b974af8&units=metric';

            fetch(forecastURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (forecastData) {
                console.log(forecastData);

                // Display 5-day forecast information
                display5DayForecast(forecastData);
              });
          });
      });
  });

  // Function to display current weather information
  function displayCurrentWeather(data) {
    // Update HTML elements with current weather data
    $('#current-weather').html(`
      <h5 class="card-title">${data.name}, ${data.sys.country}</h5>
      <p class="card-text">Temp: ${Math.round(data.main.temp)} °C</p>
      <p class="card-text">Humidity: ${data.main.humidity} %</p>
      <p class="card-text">Wind Speed: ${data.wind.speed} KPH</p>
    `);
  }

  // Function to display 5-day forecast information
  function display5DayForecast(data) {
    // Loop through the forecast data and update HTML elements for each day
    for (var i = 0; i < 5; i++) {
      var forecastDay = data.list[i];
      // Update HTML elements for each forecast day
      $(`#forecast-day-${i + 1}`).html(`
        <h5 class="card-title">${forecastDay.dt_txt}</h5> 
        <p class="card-text">Temp: ${Math.round(forecastDay.main.temp)} °C</p>
        <p class="card-text">Humidity: ${forecastDay.main.humidity} %</p>
        <p class="card-text">Wind Speed: ${forecastDay.wind.speed} KPH</p>
      `);
    }
  }

  // Function to recall display userInput to recent searches as a button (#recent-searches)
  function displayRecentSearches(inputValue) {
    // Update HTML elements with recent searches
    $('#recent-searches').html(`
      <button class="btn btn-primary" id="search-form">${inputValue}</button>
    `);
  }
});
