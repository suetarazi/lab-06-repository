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
    //SQL query:
    let SQL = 'SELECT * FROM city WHERE search_query=$1;'
    let safeValue = [city];
    client.query(SQL, safeValue)
        .then(results => {
            // console.log(results);
            if (results.rows.length>0){
                // console.log('it exists!');
               response.send(results.rows[0]);
            }else{
                // console.log('it does not exist');
                let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API}&q=${city}&format=json`

                superagent.get(url)
                .then(results => {
                    // console.log('results from superagent', results.body);
                    let geoData = results.body;
                    let location = new City(city, geoData[0]);
                    // console.log(location);
                    let SQL = 'INSERT INTO city (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);'
                    let insertValues = [location.search_query, location.formatted_query, location.latitude, location.longitude];
                    client.query(SQL, insertValues);
                    response.status(200).send(location);

                })
                .catch(err =>{
                    console.error(err);
                    response.status(500).send(err);
                })
            }
            
        })
})


function City (city, obj){
    this.search_query = city;
    this.formatted_query = obj.display_name;
    this.latitude = obj.lat;
    this.longitude = obj.lon;
}

app.get('/weather', (request, response) => {
    // console.log(request.query);
// try{
    let weather = request.query.city;
    // console.log('request.query = ', request.query);
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

//build Yelp here:
app.get('/yelp', handleYelp);
function handleYelp (request, response) {
    let city = request.query.search_query;
    let url = `https://api.yelp.com/v3/businesses/search?location=${city}`
    console.log(request.query);

    superagent.get(url)
        .set('Authorization', `Bearer ${process.env.YELP_API}`)
        .then(results => {
            console.log(results.body.businesses);
        let dataObj = results.body.businesses.map(business => {
            return new Yelp(business);
        })

        response.status(200).send(dataObj);
        })    


        .catch(err => {
            console.error(err);
            response.status(500).send(err);
        })
}

function Yelp(obj) {
    this.name = obj.name;
    this.image_url = obj.image_url;
    this.price = obj.price;
    this.rating = obj.rating;
    this.url = obj.url;
}

//build trails here: 
app.get('/trails', (request, response) =>{
    // console.log('request query', results)
    let {latitude, longitude} = request.query;
    let url = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${process.env.TRAILS_API}`

    superagent.get(url)
    .then(results => {
        // console.log('trails superagent results', results);
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

client.connect()
    .then(
app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
})
    )
