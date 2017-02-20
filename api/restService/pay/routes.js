import PayController from './pay.controller';
import checkAuth from '../checkAuth';

export default function PayRoutes(server) {
  server
    .post('/rest-api/pay', checkAuth, PayController.pay)
    .post('/rest-api/refund', checkAuth, PayController.refund)
    .post('/rest-api/void-transaction', checkAuth, PayController.voidTrans)
}
