const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req,res)
{
    res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res)
{
    const q = req.body.cityname;
    const apikey = "69d405b06add0a63080b03fe61a16b6c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid="+apikey+"&unit="+unit
    https.get(url,function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDesc= weatherData.weather[0].description
            res.write("<h1>The temperature in"+q+" is "+temp+"</h1>")
            res.send()
        });
    });
});
app.listen(3000,function(){
    console.log("Server on 3000");
});