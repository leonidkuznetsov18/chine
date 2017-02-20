import db from '../../models';


export default function categories(req) {
  return db.category.findAll()
}
