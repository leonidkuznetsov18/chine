import StatusController from './status.controller';
import checkAuth from '../checkAuth';

export default function cartRoutes(server) {
  server
    .get('/rest-api/status', checkAuth, StatusController.statusList)
}
