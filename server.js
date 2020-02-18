'use-strict'

const express = require('express');

const app = express();

require('dotenv').config;

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

require('/data/geo.json');
require('/data/darksky.json');

app.get('/location', (request, response) => {
  request.query;
})


app.listen(PORT, () => { 

})