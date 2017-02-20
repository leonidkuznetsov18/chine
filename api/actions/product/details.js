import db from '../../models';


export default function details(req) {
  const { product_id } = req.query;
  return db.product.findById(product_id, {
    include: [{
      model: db.product_modifiers,
      attributes: ['id', 'value', 'img'],
      include: [{
        model: db.modifier
      }],
    }, {
      model: db.label
    }, {
      model: db.badge
    }]
  })
}
