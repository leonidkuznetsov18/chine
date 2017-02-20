import db from '../../models';

export default class CategoryController {

  static async categoryList(req, res) {
    res.json(await db.category.findAll());
  }

  static async categoryLoad(req, res) {
    res.json(await db.category.findById(req.params.id));
  }

  static async categorySave(req, res) {
    const { id } = req.body;
    const [category] = await db.category.findOrCreate({where: {id: id}});
    await category.update(req.body);
    res.json(category);
  }

  static async categoryDelete(req, res) {
    await db.product.update({category_id: null}, {where: {category_id: req.params.id}});
    res.json(await db.category.destroy({where: {id: req.params.id}}));
  }
}
