'use-strict'

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// require('/data/darksky.json');
app.get('/location', (request, response) => {
  try {
    console.log("/./././.");
    let city = request.query.city;
    console.log(city);
    let geoData = require('./data/geo.json');
    let dataObj = new City(city, geoData[0]);
    console.log(dataObj);
    response.send(dataObj);
  } catch (err) {
    console.log(err);
  }
});

// app.get('/weather', (request, response) => {
//   try {
//     // console.log(request.query);
//     let tempData = require('./data/darksky.json');
//     // let dateObj = new Date();
//     // let date = dateObj.toDateString();
//     let tempObj = tempData.daily.data;
//     let dataObj = tempObj.map(day => new Sky(day))
//     // let dataObj = [];
//     // tempObj.forEach(day => {

//     //   dataObj.push(new Sky(day));
//     // });
//     response.send(dataObj);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get('/weather', (request, response) => {
  try {
    console.log(request.query);
    // let city = request.query.city;
    let tempData = require('./data/darksky.json');
    // let dateObj = new Date();
    // let date = dateObj.toDateString();
    let tempObj = tempData.daily.data;
    // let dataObj = [];
    // tempObj.forEach(day => {
    //   dataObj.push(new Sky(day));
    // });
    let dataObj = tempObj.map(day => new Sky(day));
    response.send(dataObj);
  } catch (err) {
    console.log(err);
  }
});

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