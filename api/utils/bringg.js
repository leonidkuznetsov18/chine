import axios from 'axios'
import qs from 'qs';
import config from '../config';

const CryptoJS = require('crypto-js');

const bringgParamsSerializer = (params) => {
  params.timestamp = Date.now();
  params.access_token = config.BRING.ACCESS_TOKEN;
  let query = qs.stringify(params, {arrayFormat: 'brackets'}).
  replace(/%5B/g, '[').
  replace(/%5D/g, ']');
  params.signature = CryptoJS.HmacSHA1(query, config.BRING.SECRET).toString();
  return params;
};

function prepareBringgTask(carts, driverId) {
  return {
    user_id: driverId,
    company_id: config.BRING.COMPANY_ID,
    title: carts.map(cart => cart.id).join(' '),
    customer: {
      name: `${carts[0].user.first_name} ${carts[0].user.last_name}`,
      address: ['city', 'street', 'building', 'apt_floor'].map(field => carts[0].address[field]).join(' '),
      email: carts[0].user.email,
      phone: carts[0].user.phone.replace(/ /g, '').replace(/\+/g, '')
    },
    way_points: carts.map(cart => {
      return {
        address: ['city', 'street', 'building', 'apt_floor'].map(field => cart.address[field]).join(' '),
        note: `ORDER ${cart.id}`,
        customer: {
          name: `${cart.user.first_name} ${cart.user.last_name}`,
          phone: cart.user.phone.replace(/ /g, '').replace(/\+/g, ''),
          email: cart.user.email
        }
      }
    })
  }
}

async function _getDrivers(){
  const params = bringgParamsSerializer({company_id: config.BRING.COMPANY_ID});
  return await axios.request({
    url: 'https://developer-api.bringg.com/partner_api/users',
    headers: {'Content-Type': 'application/json'},
    params: params
  })
}

async function _createBringTask(taskObj){
  return await axios.request({
    url: config.BRING.CREATE_TASK_PREFIX,
    method: "POST",
    baseURL: config.BRING.BASE_URL,
    params: taskObj,
    paramsSerializer: function(params){
      return qs.stringify(params, {arrayFormat: 'brackets'}).
      replace(/%5B/g, '[').
      replace(/%5D/g, ']')
    }
  });
}


export function getDrivers(){
  return _getDrivers().then(
    response => {
      return response.data
    }
  )
}


export function createBringTask(carts, driverId){
  const taskObject = prepareBringgTask(carts, driverId);
  const request = _createBringTask(taskObject);
  return request.then(
    response => {
      return response
    },
    err => {}
  )
}
