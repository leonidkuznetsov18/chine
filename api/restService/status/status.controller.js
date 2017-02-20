import db from '../../models';

export default class StatusController {

  static async statusList(req, res) {
    res.json(await db.status.findAll());
  }
}
