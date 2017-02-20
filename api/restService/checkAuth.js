import jwt from 'jsonwebtoken';
import config from '../config'
export default function checkAuth(req, res, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
  }

  jwt.verify(token, config.shared_secret, (err, decoded) => {
    if (!err) {
      next();
    } else {
      res.status(401).send(err);
    }
  });
}
