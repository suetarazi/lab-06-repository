'use strict';

require('dotenv').config();
const getWeatherAPI = require('./getWeatherAPI');

function handleWeather(request, response) {
        // let weather = request.query.city;
        let {latitude, longitude} = request.query;
        let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${latitude},${longitude}`
    
    getWeatherAPI(response, url);
}

module.exports = handleWeather;
