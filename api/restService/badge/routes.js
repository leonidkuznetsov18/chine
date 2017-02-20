import BadgeController from './badge.controller';
import checkAuth from '../checkAuth';

export default function BadgeRoutes(server) {
  server
    .get('/rest-api/badge', checkAuth, BadgeController.badgesList)
    .get('/rest-api/badge/:id', checkAuth, BadgeController.badgeLoad)
    .put('/rest-api/badge', checkAuth, BadgeController.badgeEdit)
    .delete('/rest-api/badge/:id', checkAuth, BadgeController.badgeDelete)
}
