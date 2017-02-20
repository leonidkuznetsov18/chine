import ExternalController from './external.controller';
import checkAuth from '../checkAuth';

export default function externalRoutes(server) {
  server
    .get('/rest-api/external/drivers', checkAuth, ExternalController.driversList)
    .post('/rest-api/external/tracking/order_on_the_way', ExternalController.updateOrderOnTheWay)
    .post('/rest-api/external/tracking/order_completed', ExternalController.updateOrderCompleted)
}