'use strict';

function Weather(day){
    // this.search_query = city;
    this.forecast = day.summary; 
    this.time = new Date (day.time * 1000).toDateString(); 
}


module.exports = Weather;
