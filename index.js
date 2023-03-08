const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        const cityID = String(req.body.cityIDInput);
        console.log(req.body.cityIDInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "3e255a7d1662ac9a1efc1b93512399e0";
        const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
          const wind = weatherData.wind.speed;
          const windDirection = weatherData.wind.deg;
            const city = weatherData.name;
          const clouds = weatherData.clouds.all;
          const humidity = weatherData.main.humidity;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in City " + city + ", ID " + cityID + " is " + temp + " Degrees Fahrenheit<h2>");
          res.write("<h2> The humidity is " + humidity + " percent</h2>");
          res.write("<h2> The windspeed is " + wind + " miles per hour</h2>");
      res.write("<h2> The wind direction is " + windDirection + " degrees</h2>");
          res.write("<h2> The cloudiness is " + clouds + " percent</h2>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
