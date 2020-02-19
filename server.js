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
// app.get('/location', locationHandler);
// app.get('/location', locationHandler);
// app.get('/location', locationHandler);
// app.get('/location', locationHandler);

function locationHandler(request, response) {
  // console.log(request.query);
  let city = request.query.city;
  // let geoData = require('./data/geo.json');
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
  console.log(url);

  superagent.get(url)
    .then(data => {
      const geoData = data.body[0];
      const dataObj = new City(city, geoData);
      response.send(dataObj);
    })
    .catch(() => {
      errorHandler('There was an error', request, response);
    });
  //   let dataObj = new City(city, geoData[0]);
  //   console.log(dataObj);
  //   response.send(dataObj);
  // } catch (err) {
  //   console.log(err);
  // }
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
  this.forecast = obj.summary;
  this.time = new Date(obj.time).toDateString();
}


app.listen(PORT, () => {
  console.log(`${PORT}`);
})