'use strict';

require('dotenv').config();
const pg = require('pg');
const getLocationAPIResults = require('./getLocationsAPIResults');


function handleLocation (request, response) {
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

            }
        })

        getLocationAPIResults(response, url, city);
        
    }
    

module.exports = handleLocation;