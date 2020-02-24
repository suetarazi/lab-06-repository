'use strict';

require('dotenv').config();
const pg = require('pg');
const superagent = require('superagent');
const City = require('./city');

function getLocationAPIResults(response, url, city) {
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

module.exports = getLocationAPIResults;