import db from '../models';

export default function config(req) {
  return db.config.findOne();
}

