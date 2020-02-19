'use-strict'

const express = require('express');
const app = express();
const superagent = require('superagent');

require('dotenv').config();

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;
const GEOCODE_API_KEY = process.env.GEOCODING;
const DARKSKY_API_KEY = process.env.DARKSKY;
const YELP_API_KEY = process.env.YELP;
const THEMOVIEDB_API_KEY = process.env.THEMOVIEDB;
const EVENTFUL_API_KEY = process.env.EVENTFUL;

app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', partyHandler);
// app.get('/location', locationHandler);
// app.get('/location', locationHandler);

let mapCoordinates = "";

function locationHandler(request, response) {
  // console.log(request.query);
  let city = request.query.city;
  // let geoData = require('./data/geo.json');
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
  // console.log(url);

  superagent.get(url)
    .then(data => {
      const geoData = data.body[0];
      const dataObj = new City(city, geoData);
      response.send(dataObj);
    })
    .catch(() => {
      console.error('There was an error', request, response);
    });
}

function weatherHandler(request, response) {
  let reqData = request.query;
  // let geoData = require('./data/geo.json');
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${reqData.latitude},${reqData.longitude}`;
  // const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${mapCoordinates}`;
  // console.log(url);

  superagent.get(url)
    .then(tempData => {
      const weatherData = tempData.body.daily.data;
      const dataObj = weatherData.map(day => new Sky(day));
      response.send(dataObj);
    })
    .catch(() => {
      console.error('There was an error', request, response);
    });
}

function partyHandler(request, response) {
  console.log(request.query);
  let reqData = request.query;
  // // let geoData = require('./data/geo.json');
  const url = `http://api.eventful.com/rest/events/search?app_key=${EVENTFUL_API_KEY}&where=${reqData.latitude},${reqData.longitude}&within=25`;
  console.log(url);

  superagent.get(url)
    .then(eventful => {
      const eventData = JSON.stringify(eventful.body.events);
      console.log(eventData);
      const dataObj = eventData.map(day => new Party(day));
      response.send(dataObj);
    })
    .catch(() => {
      console.error('There was an error', request, response);
    });
}

// app.get('/weather', (request, response) => {
//   try {
//     // console.log(request.query);
//     // let city = request.query.city;
//     let tempData = require('./data/darksky.json');
//     // let dateObj = new Date();
//     // let date = dateObj.toDateString();
//     let tempObj = tempData.daily.data;
//     // let dataObj = [];
//     // tempObj.forEach(day => {
//     //   dataObj.push(new Sky(day));
//     // });
//     let dataObj = tempObj.map(day => new Sky(day));
//     response.send(dataObj);
//   } catch (err) {
//     console.log(err);
//   }
// });

function City(city, obj) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Sky(obj) {
  // console.log("/./././." + obj.summary);
  this.forecast = obj.summary;
  this.time = new Date(obj.time*1000).toDateString();
}

function Party(obj){
  this.link = obj.venue_url;
  this.name = obj.title;
  this.event_date = obj.start_time;
  this.summary = obj.description;
}

app.listen(PORT, () => {
  console.log(`${PORT}`);
})