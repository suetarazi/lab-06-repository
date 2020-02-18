'use strict';

const express = require ('express');
const app = express ();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('listening to ${PORT}');
})

app.get('/location', (require, Response)=>{
try{
    let city = request.query.city;
    let geoData = require('./data/geo.json');

    let location = new City(city, geoData[0]);
    Response.send(location);
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
