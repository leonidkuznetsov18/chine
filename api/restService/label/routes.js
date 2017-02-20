import LabelController from './label.controller';
import checkAuth from '../checkAuth';

export default function labelRoutes(server) {
  server
    .get('/rest-api/label', checkAuth, LabelController.labelsList)
}

