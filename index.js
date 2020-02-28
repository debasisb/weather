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
       // var zip = String(req.body.zipInput);;
        //console.log(req.body.zipInput);
    





    //takes in the city nanme from the HTML form, display in console. 

      const cityName = req.body.cityName;
      console.log(cityName);



    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "de82c0db0c44c0274ea961ddad82002b"; //Yasha API Key
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            //const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity; //humidity path
            const windSpeed = weatherData.wind.speed; //wind speed path
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The temperature in " + cityName + " is " + temp + "\u00B0 Fahrenheit<h2>");
            res.write("<h2>The humidity is " + humidity + "%.<h2>");
            res.write("<h2>The wind speed is " + windSpeed + " mph. </h2>");
            res.write("<img src=" + imageURL +">");
            
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(3000, function() {
console.log ("Server is running on port //3000")
});