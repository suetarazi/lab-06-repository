'use strict';

const superagent = require('superagent');
const Weather = require('./weather');

function getWeatherAPI (response, url) {
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

}

module.exports = getWeatherAPI;


