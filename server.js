'use-strict'

const express = require('express');

const app = express();

require('dotenv').config;

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// require('/data/darksky.json');

app.get('/location', (request, response) => {
  let city = request.query.city;
  let geoData = require('./data/geo.json');
  let dataObj = new City(city, geoData[0]);


  response.send(dataObj);
})


function City (city, obj){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

app.listen(PORT, () => { 

})