'use strict';

const express = require ('express');
const app = express ();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;


app.get('/location', (request, response)=>{
try{
    let city = request.query.city;
    console.log(city);
    let geoData = require('./data/geo.json');
    let location = new City(city, geoData[0]);
    console.log(location);
    response.send(location);
}
catch(err){
    console.log(err);
    response.status(500).send(err);
}
})

function City (city, obj){
    this.search_query = city;
    this.formatted_query = obj.display_name;
    this.latitude = obj.lat;
    this.longitude = obj.lon;
}

app.get('/weather', (request, response) => {
    console.log(request.query);
    // let weather = request.query.city;
    // console.log(weather);
    let skyData = require ('./data/darksky.json');
    let weatherObj = skyData.daily.data;
    let weatherResults = [];
    weatherObj.forEach(day => {
        weatherResults.push(new Weather(day));
    })
    
    
    // console.log(forecast, time);
    response.send(weatherResults);
})

function Weather(day){
    this.search_query = city;
    this.forecast = day.summary; 
    this.time = new Date (day.time).toDateString(); 
}

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})
