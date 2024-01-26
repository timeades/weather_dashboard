var locationqueryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=3b16f2fcebfa1cc98b2d860c9b974af8';

// First we need to get the lat and lon for the city
fetch(locationqueryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(JSON.stringify(data));
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(lat);
    console.log(lon);
  });