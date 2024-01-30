// using jquery we need to capture the input into id="search-input" in a var when the id="search-button" is clicked
// we also need to save it to local storage when the user clicks on the search button
// Get the elements

$(document).ready(function () {
  // Load existing entries from local storage (if any)
  var entries = JSON.parse(localStorage.getItem('searchEntries')) || [];

  // Function to save the value to local storage
  function saveToLocalStorage(value) {
    entries.push(value);
    localStorage.setItem('searchEntries', JSON.stringify(entries));
  }

  // Event handler for the button click
  $('#search-form').on('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the value from the input field
    let inputValue = $('#search-input').val();

    // Save the value to local storage
    saveToLocalStorage(inputValue);

    // Optional: Display a message or perform any other actions
    console.log('Value saved to local storage:', inputValue);

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
        var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=3b16f2fcebfa1cc98b2d860c9b974af8&units=metric';

        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            // Save to local storage
            localStorage.setItem('weather', JSON.stringify(data));
            // Get from local storage
            var weather = JSON.parse(localStorage.getItem('weather'));
          });
      });
  });
});