import CategoryController from './category.controller';
import checkAuth from '../checkAuth';

export default function categoryRoutes(server) {
  server
    .get('/rest-api/category', checkAuth, CategoryController.categoryList)
    .get('/rest-api/category/:id', checkAuth, CategoryController.categoryLoad)
    .put('/rest-api/category', checkAuth, CategoryController.categorySave)
    .delete('/rest-api/category/:id', checkAuth, CategoryController.categoryDelete)
}
