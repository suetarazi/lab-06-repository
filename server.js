'use strict';

const pg = require('pg');
require('dotenv').config();

const express = require ('express');
const app = express ();
const superagent = require('superagent');

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;


const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));


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
    .catch(err =>{
        console.error(err);
        response.status(500).send(err);
    })
})


function City (city, obj){
    this.search_query = city;
    this.formatted_query = obj.display_name;
    this.latitude = obj.lat;
    this.longitude = obj.lon;
}

app.get('/weather', (request, response) => {
    console.log(request.query);
// try{
    let weather = request.query.city;
    console.log('request.query = ', request.query);
    // let latitude = request.query.latitude;
    // let longitude = request.query.longitude;
    let {latitude, longitude} = request.query;
    let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${latitude},${longitude}`
    
    superagent.get(url)
    .then(results => {
        // console.log('darksky superagent results', results.body.daily.data);
        let darkSkyResults = results.body.daily.data;
        let weatherResults = darkSkyResults.map((day) => (new Weather(day)));
        response.send(weatherResults);
    })
    .catch(err =>{
        console.error(err);
        response.status(500).send(err);
    })
})


function Weather(day){
    // this.search_query = city;
    this.forecast = day.summary; 
    this.time = new Date (day.time * 1000).toDateString(); 
}

//build trails here: 
app.get('/trails', (request, response) =>{
    // console.log('request query', results)
    let {latitude, longitude} = request.query;
    let url = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${process.env.TRAILS_API}`

    superagent.get(url)
    .then(results => {
        console.log('trails superagent results', results);
        let trailData = results.body.trails;
        let trailResults = trailData.map((data) => (new Trails(data)));
        response.send(trailResults);
    })
    .catch(err =>{
        console.error(err);
        response.status(500).send(err);
    })
})

function Trails(data){
  this.name = data.name;
  this.location = data.location;
  this.length = data.length;
  this.stars = data.stars;
  this.star_votes = data.star_votes;
  this.summary = data.summary;
  this.trail_url = data.trail_url;
  this.conditions = data.conditions;
  this.condition_date = data.condition_date;
  this.condition_time = data.condition_time;  
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