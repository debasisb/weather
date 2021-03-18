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
        var cityid = String(req.body.cityid);
        console.log(req.body.cityid);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "67f6b382921c1e89b39b20d4f9556f22";
        const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityid +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const maxtemp = weatherData.main.temp;
            const windspeed = weatherData.wind.speed;
            const winddeg = weatherData.wind.deg;
            const clouds = weatherData.clouds.all;
            
            // displays the output of the results
            res.write("<h1> The weather for city " + city + "<h1>");
            res.write("<h2>The Temperature in " + city + " is " + maxtemp + " Degrees Fahrenheit<h2>");
            res.write("<h2>The Wind Speed and Direction in " + city + " is " + windspeed + " mph<h2>");
            res.write("<h2>The Wind Direction in " + city + " is " + winddeg + " degrees<h2>");
            res.write("<h2>The Cloudiness in " + city + " is " + clouds + " % <h2>");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
