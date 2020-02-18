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

// app.get('/location', (require, Response)=>{
//     console.log(req);
// })

// console.log(request.query.city);
