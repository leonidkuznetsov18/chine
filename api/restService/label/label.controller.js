import db from '../../models'

export default class LabelController {

  static async labelsList(req, res) {
    res.json(await db.label.findAll());
  }
}
