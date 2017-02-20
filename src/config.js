require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  GOOGLE_MAPS_API_KEY: 'AIzaSyBzmEwzbpRA87Tnnt3GI3JwbzrrSsHKwfk',
  bringgKey: 'st_z4JzMbeU2G9UFBkyo',
  distanceLimit: 8001, // in meters
  defaultPosition: {lat: 30.2955315, lng: -97.71732643},
  pickupAddress: {
    city: 'AUSTIN TX 78722',
    street: 'NORTH I35, E-5',
    building: '3909'
  },
  app: {
    title: 'TSO',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'TSO: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {name: 'theme-color', content: '#ffffff'},
        {'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'TSO'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'TSO'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
