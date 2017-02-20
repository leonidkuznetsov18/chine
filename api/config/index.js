const __ENV__ = process.env.NODE_ENV || 'development';

const CONFIG = require(`./api.${__ENV__}.config.js`);

CONFIG.mapDefaultPosition = {lat: 30.3000728, lng: -97.7157896};
CONFIG.mapAPIKey = 'AIzaSyCQoAOTctKwJOFSp4c-yY5R4T4ZsuT1akM';
CONFIG.spiciness = ['Not spicy', 'Mild', 'Spicy', 'Extra spicy'];

export default CONFIG;
