const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {

  // takes in the latitude and longitude.
  var latitude = String(req.body.latInput);
  console.log(req.body.latInput);

  var longitude = String(req.body.lonInput);
  console.log(req.body.lonInput);

  //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
  const units = "imperial";
  const apiKey = "135dd5ca91d4c25acc01b6482306ed5b";
  const url = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + latitude + "&" + "lon=" + longitude + "&units=" + units + "&APPID=" + apiKey;

  // this gets the data from Open WeatherPI
  https.get(url, function(response) {
    console.log(response.statusCode);

    // gets individual items from Open Weather API
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const cloudiness = weatherData.clouds.all;
      const temp = weatherData.main.temp;
      const city = weatherData.name;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // displays the output of the results
      res.write("<h1> The weather is " + weatherDescription + "<h1>");

      res.write("<h2>The Temperature in " + city + " is " + temp + " Degrees Fahrenheit<h2>");

      res.write("<h2>The current humidity is " + humidity + "%<h2>");

      res.write("<h2>The current wind speed is: " + windSpeed + " mph<h2> ");

      res.write("<h2>Cloudiness is " + cloudiness + "%<h2>")

      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port")
});