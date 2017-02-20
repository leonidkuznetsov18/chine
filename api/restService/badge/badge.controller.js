import db from '../../models'

export default class BadgeController {
  static async badgesList(req, res) {
    res.json(await db.badge.findAll());
  }

  static async badgeLoad(req, res) {
    res.json(await db.badge.findById(req.params.id));
  }

  static async badgeEdit(req, res) {
    const { id } = req.body;

    const [badge] = await db.badge.findOrCreate({where: {id: id}});
    await badge.update(req.body);
    res.json(badge);
  }

  static async badgeDelete(req, res) {
    res.json(await db.badge.destroy({where: {id: req.params.id}}));
  }

}
