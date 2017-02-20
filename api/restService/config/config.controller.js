import db from '../../models';
import  saveOptimizedImg  from '../../utils/saveOptimizedImg';

export default class CartController {

  static async configLoad(req, res) {
    const [config, created] = await db.config.findOrCreate({where: {restaurant_id: null}});
    res.json(config);
  }

  static async configEdit(req, res) {
    let data = req.body;
    const config = await db.config.findOne();
    if(req.file) {
      await saveOptimizedImg(req.file.filename, 'splash_screen');
      data.splash_screen = req.file.filename;
    }
    await config.update(data);
    res.json(config);
  }
}
