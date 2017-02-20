import PromoCodes from './promo_codes.controller';
import checkAuth from '../checkAuth';


export default function productsRoutes(server) {
  server
    .post('/rest-api/promo_codes', checkAuth, PromoCodes.create)
    .post('/rest-api/promo_codes/unique', checkAuth, PromoCodes.checkName)
    .get('/rest-api/promo_codes', checkAuth, PromoCodes.list)
    .put('/rest-api/promo_codes', checkAuth, PromoCodes.update)
    .delete('/rest-api/promo_codes/:id', checkAuth, PromoCodes._delete)
}

