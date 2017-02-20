import db from '../../models'
import crypto from 'crypto';
import config from '../../config'
import jwt from 'jsonwebtoken';
import { email_send } from '../../mandrill/mandrill-service.js';

export default class UserController {
  static async login(req, res) {
    try {
      const availableRoles = ['user', 'admin'];
      const password = crypto.createHash('sha256')
        .update(req.body.password)
        .digest('hex');

      const user = await db.user.findOne({
        attributes: ['id', 'email', 'phone', 'is_active', 'first_name', 'last_name', 'role'],
        where: {
          $or: [{email: req.body.name}, {phone: req.body.name}],
          $and: [{password: password}]
        }
      });
      if (user && !!availableRoles.find(ar => ar === user.role)) {
        const token = jwt.sign({id: user.id, role: user.role}, config.shared_secret, {expiresIn: '365d'});
        res.json({token, ...user.get({json: true})});
      } else if (user && !availableRoles.find(ar => ar === user.role)) {
        res.status(403).end('Permission denied');
      } else {
        res.status(401.1).end('User does not exist');
      }
    } catch (e) {
      console.log('Login error: ', e);
      res.status(500).end(e);
    }
  }

  static async userInfo(req, res){
    let token = req.headers['authorization'];
    if (token) {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, config.shared_secret);
      const user = await db.user.findById(decoded.id);
      if (!user) res.status(401).json({ error: 'User does not exist' });
      else res.json(user);
    } else {
      res.status(401).end('User does not exist');
    }
  }

  static async usersList(req, res) {
    res.json(await db.user.findAll({
      attributes: ['id', 'email', 'phone', 'is_active', 'first_name', 'last_name', 'role'],
      include: [{
        model: db.address
      }]
    }));
  }

  static async userLoad(req, res) {
    res.json(await db.user.findById(req.params.id,
      {
        attributes: ['id', 'email', 'phone', 'is_active', 'first_name', 'last_name', 'role'],
        include: [{
          model: db.address
        }]
      }
    ));
  }

  static async userEdit(req, res) {
    const { id, email, role, phone, first_name, last_name, is_active, password } = req.body;
    try {
      let pass = null;
      if (password) {
        pass = crypto.createHash('sha256')
          .update(password)
          .digest('hex');
      }
      const userResponse = await db.user.findOrCreate({where: {id: id}, defaults: {
        email: email,
        phone: phone,
        first_name: first_name,
        last_name: last_name,
        password: pass,
        role: role,
        is_active: is_active
      }});
      const user = userResponse[0];
      const created = userResponse[1];
      if (!created) {
        await user.update(req.body)
      } else {
        email_send(user);
      }
      res.json(user);
    } catch (e) {
      console.log('User save error: ', e);
      res.status(500).end(e);
    }
  }
}
