import db from '../../models'


export default class PromoCodesController{
  
  static async create(req, res){
    await db.promo_code.create({...req.body}).then(promo_code => {
      res.json(promo_code)
    })
  }

  static async checkName(req, res){
    await db.promo_code.count({
      where: {name: req.body.name}
    }).then(count => {
      if (count != 0) {
        res.status(500).send('Promo code with this name already exists')
      } else {
        res.status(200).send('OK')
      }
    })
  }
  
  static async list(req, res){
    res.json(await db.promo_code.findAll())
  }
  
  static async update(req, res) {
    const {id, ...payload} = req.body;
    const promoCode = await db.promo_code.findById(id);
    promoCode.update({...payload}).then(pc => {
      res.json(pc)
    })
  }
  
  static async _delete(req, res){
    const {id} = req.params;
    const promoCode = await db.promo_code.findById(id);
    promoCode.destroy().then(() => res.json({id: parseInt(id)}))
  }
}


