'use-strict'

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// require('/data/darksky.json');
app.get('/location', (request, response) => {
  console.log("/./././.");
  let city = request.query.city;
  console.log(city);
  let geoData = require('./data/geo.json');
  let dataObj = new City(city, geoData[0]);
  console.log(dataObj);


  response.send(dataObj);
})

app.get('/weather', (request, response) => {
  let city = request.query.city;
  let tempData = require('./data/darksky.json');
  // let dateObj = new Date();
  // let date = dateObj.toDateString();
  let tempObj = tempData.daily.data[0];
  // let dataObj = [];
  for (let i = 0; i < tempObj.length; i++) {
    // dataObj.push(new Sky(tempData));
  }
  response.send(dataObj);
})

function City(city, obj) {
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Sky(obj) {
  this.forecast = 
  this.time =
}


app.listen(PORT, () => {
  console.log(`${PORT}`);
})