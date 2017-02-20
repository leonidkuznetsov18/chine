import CartController from './cart.controller';
import checkAuth from '../checkAuth';

export default function cartRoutes(server) {
  server
    .get('/rest-api/cart', checkAuth, CartController.cartList)
    .get('/rest-api/cart/:id', checkAuth, CartController.cartLoad)
    .delete('/rest-api/cart/:id', checkAuth, CartController.cartRemove)
    .put('/rest-api/cart', checkAuth, CartController.cartEdit)
    .put('/rest-api/cart-status', checkAuth, CartController.cartStatusUpdate)
    .put('/rest-api/cart/:cartId/product-add/:productId', checkAuth, CartController.cartProductAdd)
    .get('/rest-api/dashboard', checkAuth, CartController.dashboardCartList)
    .put('/rest-api/cart/bulkUpdate', checkAuth, CartController.cartStatusBulkUpdate)
    .post('/rest-api/cart/assignTo', checkAuth, CartController.cartAssignmentUpdate)
}
