'use strict';

const express = require ('express');
const app = express ();
const superagent = require('superagent');
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;


app.get('/location', (request, response)=>{
// try{
    let city = request.query.city;
    console.log(city);
    // let geoData = require('./data/geo.json');
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API}&q=${city}&format=json`

    superagent.get(url)
    .then(results => {
        console.log('results from superagent', results.body);
        let geoData = results.body;
        let location = new City(city, geoData[0]);
        // console.log(location);
        response.status(200).send(location);

    })
}
// catch(err){
//     console.log('error', err);
//     response.status(500).send(err);
// }
)


function City (city, obj){
    this.search_query = city;
    this.formatted_query = obj.display_name;
    this.latitude = obj.lat;
    this.longitude = obj.lon;
}

app.get('/weather', (request, response) => {
    console.log(request.query);
try{
    let weather = request.query.city;
    // console.log(weather);
    let skyData = require('./data/darksky.json');
    let weatherObj = skyData.daily.data;
    let weatherResults = weatherObj.map((day) => (new Weather(day)));
    
    // weatherObj.forEach(day => {
    //     weatherResults.push(new Weather(day));
    // })
    response.send(weatherResults);
}
catch(err){
    console.log('error', err);
    response.status(500).send(err);
} 
})


function Weather(day){
    // this.search_query = city;
    this.forecast = day.summary; 
    this.time = new Date (day.time).toDateString(); 
}

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})


// function Weather(day){
//     this.search_query = city;
//     this.forecast = day.summary; 

// app.get('/location', (require, Response)=>{
// try{
//     let city = request.query.city;
//     let geoData = require('./data/geo.json');

//     let location = new City(city, geoData[0]);
//     Response.send(location);
// }
// catch(err){
//     console.log(err);
// }
// })

// function City (city, obj){
//     this.search_query = city;
//     this.formatted_query = obj.display_name;
//     this.latitude = obj.lat;
//     this.longitude = obj.lon;
// }

// app.get('/weather', (request, response) => {
//     console.log(request.query);
//     // let weather = request.query.city;
//     // console.log(weather);
//     let skyData = require ('./data/darksky.json');
//     let weatherObj = skyData.daily.data;
//     let weatherResults = [];
//     weatherObj.forEach(day => {
//         weatherResults.push(new Weather(day));
//     })
    
    
//     // console.log(forecast, time);
//     response.send(weatherResults);
// })