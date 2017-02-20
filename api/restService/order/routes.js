import ModifierController from './order.controller';
import checkAuth from '../checkAuth';

export default function modifierRoutes(server) {
  server
    .get('/rest-api/order', checkAuth, ModifierController.orderList)
    .get('/rest-api/order/:id', checkAuth, ModifierController.orderLoad)
    .put('/rest-api/order/', checkAuth, ModifierController.orderEdit)
    .delete('/rest-api/order/:id', checkAuth, ModifierController.orderDelete)
    .post('/rest-api/order/extra', checkAuth, ModifierController.extraAdd)
    .delete('/rest-api/order/extra/:id', checkAuth, ModifierController.extraRemove)
}

