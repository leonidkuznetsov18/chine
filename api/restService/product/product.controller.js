import db from '../../models'
import saveOptimizedImg from '../../utils/saveOptimizedImg'

export default class ProductController {
  static async productsList(req, res) {
    const products = await db.product.findAll({
      include: [{
        model: db.category
      }],
      order: [['sorting', 'ASC']]
    });
    res.json(products);
  }

  static async productLoad(req, res) {
    res.json(await db.product.findById(req.params.id,
      {include: [{
        model: db.product_modifiers,
        attributes: ['id', 'value', 'img'],
        include: [{
          model: db.modifier
        }],
      }, {
        model: db.label,
        attributes: ['id']
      }]}
    ));
  }

  static async productImageSave(req, res) {
    const product = await db.product.findById(req.body.productId);
    await saveOptimizedImg(req.file.filename);
    await product.update({img: req.file.filename});
    res.json(product);
  }

  static async modify(req, res) {
    return db.sequelize.transaction().then(t => {
      return db.sequelize.Promise.map(req.files, item => {
        return db.product_modifiers.update({img: item.filename}, {where: {modifier_id: item.fieldname, product_id: req.body.productId}}, {transaction: t});
      }).then((res) => {
          t.commit();
      })
    })
    res.json({});
  }

  static async deleteSpicy(req, res) {
    const product = await db.product.findById(req.params.id,
      {include: [{
        model: db.product_modifiers,
        attributes: ['id', 'value', 'img'],
        include: [{
          model: db.modifier
        }],
      }]}
    );
    const modifierWithSpicy = await product.product_modifiers.find(m => m.modifier.type === 'spiciness');
    if (modifierWithSpicy) {
      const productModifiers = await db.product_modifiers.destroy({where: {
        $and: [{product_id: req.params.id}, {modifier_id: modifierWithSpicy.modifier.id}]
      }});
      res.json(productModifiers);
    } else {
      return Promise.reject({});
    }
  }

  static async productSave(req, res) {
    const {
      id,
      labels,
      product_modifiers,
      badge_id,
      station
    } = req.body;

    if (badge_id == 0) {
      req.body.badge_id = null
    }

    if (!station) {
      req.body.station = null;
    }

    const [product, created] = await db.product.findOrCreate({where: {id: id}});
    await product.update(req.body);
    await db.product_modifiers.destroy({where: {product_id: product.id}});

    if (labels && labels.length){
      const labelObjs = await db.label.findAll({where: {
        id: {$in: [labels.map(l => l.id)]}
      }})

      await product.setLabels(labelObjs);
    } else {
      await product.setLabels([])
    }

    const productModifiers = [];
    product_modifiers.map(modifier => {
      if (modifier){
        productModifiers.push({
          product_id: product.id,
          modifier_id: modifier.modifier.id,
          value: modifier.value,
          img: modifier.img
        });
      }
    })
    await db.product_modifiers.bulkCreate(productModifiers);

    product.reload().then(prd => res.json(prd));
  }

  static setSorting(req, res) {
    return db.sequelize.transaction().then(t => {
      return db.sequelize.Promise.map(req.body, item => {
        return db.product.update({sorting: item.index}, {where: {id: item.itemId}}, {transaction: t});
      }).then((res) => {
          t.commit();
      })
    })
    res.json({});
  }

  static deleteProduct(req, res) {
    res.json(db.product.destroy({where: {id: req.params.id}}));
  }
}
