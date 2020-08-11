// Core modules:
const path = require('path');

// Third-party modules:
const request = require('request');
const { urlencoded } = require('express');

// Utils:
const forecast = require('../utils/forecast');

forecast('Surrey', 'British Columbia', (err, res) => {
  if(err) {
    return console.log(err);
  }
  console.log(res);
})