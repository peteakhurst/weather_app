 var weatherApp = function () {

   var lat;
   var long;
   var api;
   var datetoday = new Date();
   var hours = datetoday.getHours();
   var minutes = datetoday.getMinutes();
   //var seconds = datetoday.getSeconds();
   var shortDate = datetoday.toLocaleDateString();

   var swapTemp = true;

   //--- get IPInfo ---//
   $.getJSON('https://ipinfo.io/geo', function (response) {
     var loc = response.loc.split(',');
     var coords = {
       latitude: loc[0],
       longitude: loc[1]
     };

     lat = coords.latitude;
     long = coords.longitude;

     api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=b3b0e04009a43884a84d40e79112d919';
     console.log(api);

     // --- Get weather details from api now that we have Coords --- //
     $.getJSON(api, function (location) {
       console.log(location);

       var city = location.name;
       var country = location.sys.country;
       var weather = location.weather[0].description;
       var weatherIcon = location.weather[0].icon;
       var kelvin = location.main.temp;
       var celsius = (kelvin - 273.15).toFixed(2); // convert kelvin to celsuis
       var fahrenheit = ((celsius * 9 / 5) + 32).toFixed(2); // convert celsuis to fahreheit
       var windSpeedMS = location.wind.speed;
       var windDirection = location.wind.deg;
       var windSpeedKMH = (windSpeedMS * 2.23694).toFixed(2);
       var pressure = location.main.pressure;
       var humidity = location.main.humidity;
       var sunrise = location.sys.sunrise;
       var sunriseDate = new Date(sunrise * 1000);
       var sunriseTime = (sunriseDate.getHours() + ':' + sunriseDate.getMinutes() + ' am');
       var sunset = location.sys.sunset;
       var sunsetDate = new Date(sunset * 1000);
       var sunsetTime = (sunsetDate.getHours() - 12) + ':' + sunsetDate.getMinutes() + ' pm';
       var updated = location.dt;
       var updatedDate = new Date(updated * 1000);
       var updatedTime = (updatedDate.getHours() + ':' + updatedDate.getMinutes());

       if (windDirection >= 0 && windDirection <= 22.5) {
         windDirection = ' North North East';
       } else if (windDirection > 22.5 && windDirection <= 45) {
         windDirection = ' North East';
       } else if (windDirection > 45 && windDirection <= 67.5) {
         windDirection = ' North East East';
       } else if (windDirection > 67.5 && windDirection <= 90) {
         windDirection = ' East';
       } else if (windDirection > 90 && windDirection <= 112.5) {
         windDirection = ' East South East';
       } else if (windDirection > 112.5 && windDirection <= 135) {
         windDirection = ' South East';
       } else if (windDirection > 135 && windDirection <= 157.50) {
         windDirection = ' South Ssouth East';
       } else if (windDirection > 157.5 && windDirection <= 180) {
         windDirection = ' South';
       } else if (windDirection > 180 && windDirection <= 202.50) {
         windDirection = ' South South West';
       } else if (windDirection > 202.5 && windDirection <= 225) {
         windDirection = ' South West';
       } else if (windDirection > 225 && windDirection <= 247.50) {
         windDirection = ' West South West';
       } else if (windDirection > 247.50 && windDirection <= 270) {
         windDirection = ' West';
       } else if (windDirection > 270 && windDirection <= 292.5) {
         windDirection = ' West North West';
       } else if (windDirection > 292.5 && windDirection <= 315) {
         windDirection = ' North West';
       } else if (windDirection > 315 && windDirection <= 337.50) {
         windDirection = ' North North West';
       } else
         (windDirection = ' North');


       $('#area').html(city + ', ' + country);

       $('#date').html('Updated ' + updatedTime + ' ' + shortDate);

       $('#cloudiness').html("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'>" + weather);

       $('#temps').html("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'>" + celsius + 'ºC');

       $('#windSpeed').html('Wind Speed ' + windSpeedKMH + ' km/h' + windDirection);

       $('#sunrise').html(sunriseTime);

       $('#sunset').html(sunsetTime);

       $('#humidity').html(humidity + '%');

       // --- Function to change temperature reading from C to F ---//
       $("#temps").click(function () {

         if (swapTemp === true) {

           $("#temps").html("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'>" + fahrenheit + 'ºF');
           swapTemp = false;
         } else {

           $("#temps").html("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'>" + celsius + 'ºC');
           swapTemp = true;

         }

       });

       // --- End Change Temperature Reading Function --- //

     });

     //--- End Get weather details --- //

   });
   // --- End get IPInfo Coords --- //
 };

 //-- End WeatherApp ---//
 $(document).ready(weatherApp);