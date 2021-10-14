const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{

  res.sendFile(__dirname +"/index.html");
})

app.post("/",function(req,res)
{

  const query=req.body.cityname;
  const apiKey="257ff6283fa87977e64808276b5d0a0d";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
             //https:/api.openweathermap.org/data/2.5/weather?q=kakinada&appid=257ff6283fa87977e64808276b5d0a0d&units=metric
  https.get(url,function(response)
{
  console.log(response.statusCode);
  response.on("data",function(data)
{
    const weatherData =JSON.parse(data);
    const temp = weatherData.main.temp;

    const des=weatherData.weather[0].description;


    res.write("<p>The weather is currently "+des+"<p>");
    res.write("<h1> The Temperture in "+query+" is " +temp+" degress celcius<h1>");

    res.send();



});
});

});

app.listen(3000,function()
{
  console.log("Server is running on port 3000");
});
