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
}
})

function City (city, obj){
    this.search_query = city;
    this.formatted_query = obj.display_name;
    this.latitude = obj.lat;
    this.longitude = obj.lon;
}

app.get('/weather', request, response) => {
    let weather = request.query.city;
    console.log(weather);
    let skyData = require ('./data/darksky.json');
    let weatherObj = weather.daily[1];
    
    // for (const i=0; i<obj.daily.data.length; i<8){
    // weatherObj.push(new Weather (darksky[i]));
    }
    console.log(forecast, time);
    response.send(forecast, time);
}

function Weather(city, obj){
    this.search_query = city;
    this.forecast = obj.daily.data[i].summary; 
    let date = new Date (obj.daily.data[i].time);
    this.time = date.toDateString(); 
}


app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})
