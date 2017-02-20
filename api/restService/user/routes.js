import UserController from './user.controller';
import checkAuth from '../checkAuth';

export default function userRoutes(server) {
  server
    .post('/rest-api/user/login', UserController.login)
    .get('/rest-api/user', checkAuth, UserController.usersList)
    .get('/rest-api/user/info', checkAuth, UserController.userInfo)
    .get('/rest-api/user/:id', checkAuth, UserController.userLoad)
    .put('/rest-api/user', checkAuth, UserController.userEdit)
}

