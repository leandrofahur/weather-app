// Core modules:
const path = require('path');

// Third-party modules:
const express = require('express');
const hbs = require('hbs');

// Utils:
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Express configurations:
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

// Setup the template:
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'templates', 'views'));
hbs.registerPartials(path.join(__dirname, '..', 'templates', 'partials'));

// Display app:
app.get('/', (req, res) => {
  res.render('index', {
    aboutTag: "",
    contactTag: ""
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    aboutTag: "current",
    contactTag: ""
  });
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    aboutTag: "",
    contactTag: "current"
  });
})

// Request to your api:
app.get('/weather', (req, res) => {
  const city = req.query.city;
  const country = req.query.country;
  if(!city || !country) {
    return res.send({error: 'The address is required'});
  }
  forecast(city, country, (err, data) => {
    if(err) {
      return res.send(err);
    }
    res.status(200).send(data);
  })
});

// Handle error in uri:
app.get('/*', (req, res) => {
  res.send('404')
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
})











// forecast('Surrey', 'British Columbia', (err, res) => {
//   if(err) {
//     return console.log(err);
//   }
//   console.log(res);
// })