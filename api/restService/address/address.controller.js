import db from '../../models'

export default class AddressController {
  static async addressList(req, res) {
    res.json(await db.address.findAll());
  }

  static async addressLoad(req, res) {
    res.json(await db.address.findById(req.params.id));
  }

  static async addressEdit(req, res) {
    const { id, name, slug } = req.body;
    const [address, created] = await db.address.findOrCreate({where: {id: id}});
    await address.update(req.body)
    res.json(address);
  }
  static async addressDelete(req, res) {
    res.json(db.address.destroy({where: {id: req.params.id}}));
  }

}
