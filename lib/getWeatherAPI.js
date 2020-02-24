'use strict';

const superagent = require('superagent');
const Weather = require('./weather');

function getWeatherAPI (response, url, weather) {
    superagent.get(url)
    .then(superagentResults => {
        // console.log('darksky superagent results', results.body.daily.data);
        let darkSkyResults = results.body.daily.data;
        let weatherResults = darkSkyResults.map((day) => (new Weather(day, superagentResults.body[0])));
        response.send(weatherResults);
    })
    .catch(err =>{
        console.error(err);
        response.status(500).send(err);
    })

}

module.exports = getWeatherAPI;


