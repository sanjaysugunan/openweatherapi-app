const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");

})
app.post("/", function(req,res){
    
    const city = req.body.cityName;
    const apikey= process.env.API_KEY;
    const units ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            console.log(weatherData);
            res.write("<h1>The temperature in "+city+" is: "+temp+"degree celcius.</h1>");
            res.write("<br/><h2>The weather is currently: "+desc+"</h2>");
            res.write("<img src="+imgURL+">");
            res.send();
    

        })
    })
})
app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})
