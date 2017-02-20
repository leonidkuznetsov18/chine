import db from '../../models'
export default class ModifierController {

  static async modifiersList(req, res) {
    res.json(await db.modifier.findAll());
  }

  static async modifierLoad(req, res) {
    res.json(await db.modifier.findById(req.params.id));
  }

  static async modifierEdit(req, res) {
    const { id, name, slug } = req.body;
    let { img } = req.body;

    const [modifier, created] = await db.modifier.findOrCreate({where: {id: id}});
    if (req.file)
      img = req.file.filename;
    await modifier.update({...req.body, img: img});
    res.json(modifier);
  }
  static async modifierDelete(req, res) {
    res.json(db.modifier.destroy({where: {id: req.params.id}}));
  }
}
