import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions';
import * as adminActions from './restService';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import https from 'https';
import http from 'http';
import SocketIo from 'socket.io';
import fs from 'fs';
import multer from 'multer';

const pretty = new PrettyError();
const app = express();
let server;
if (['production', 'preproduction'].includes(process.env.NODE_ENV)){
  const env = process.env.NODE_ENV;
  const SSLOpts = {
    cert: fs.readFileSync(env === 'preproduction' ? '/etc/letsencrypt/live/pre.tsodelivery.com/fullchain.pem' : '/etc/letsencrypt/live/tsodelivery.com/fullchain.pem'),
    key: fs.readFileSync(env === 'preproduction' ? '/etc/letsencrypt/live/pre.tsodelivery.com/privkey.pem' : '/etc/letsencrypt/live/tsodelivery.com/privkey.pem')
  };
  server = https.createServer(SSLOpts, app)
} else {
  server = http.createServer(app)
}

export const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(bodyParser.json());

app.use('/rest-api', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
  } else {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept");
    next();
  }
})

for (const key in adminActions) {
  require(`./restService/${key}/routes.js`)(app);
}

app.use('/', (req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const {action, params} = mapUrl(actions, splittedUrlPath);
  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

if (config.apiPort) {
  const runnable = server.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (client) => {
    const orderID = client.handshake.query.order_id;
    if (orderID === 'admin'){
      client.join('admin');
    } else {
      client.join(orderID);
    }
    client.on('updateOrderStatus', (msg) => {
      const {status, id} = msg;
      io.to(id).emit('updateOrderStatus', msg);
      io.to('admin').emit('updateOrderStatus', msg)
    });
    client.on('forceDisconnect', () => {
      client.disconnect()
    })
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
