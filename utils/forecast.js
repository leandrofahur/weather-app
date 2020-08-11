// Third-party modules:
const request = require('request');

const ACCESS_KEY = 'f0e16ba1c14b8281bc3f39a21b50d172';

const forecast = (city, country, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=' + encodeURIComponent(ACCESS_KEY) + '&query=' + encodeURIComponent(city) + ' ' + encodeURIComponent(country);

  request({url}, (error, response) => {
    const data = JSON.parse(response.body);

    if(data.success === false) {
      // return console.log(data.error.info);
      callback(data.error.info, undefined);
    }
    
    const temperature = data.current.temperature;
    const weatherDescriptions = data.current.weather_descriptions;
    const precip = data.current.precip;
    const weatherIcon = data.current.weather_icons;
    const fellsLike = data.current.feelslike;

    const forecastData = {
      temperature,
      fellsLike,
      precip,
      weatherIcon,
      weatherDescriptions
    }
    // console.log(forecastData);
    callback(undefined, forecastData);
  });
};

module.exports = forecast;