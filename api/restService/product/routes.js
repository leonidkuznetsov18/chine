import ProductController from './product.controller';
import checkAuth from '../checkAuth';
import multer from 'multer';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: `${process.cwd()}/static/uploads/products`,
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);

      cb(null, `${raw.toString('hex')}.${file.originalname}`);
    });
  }
});

const upload = multer({ storage: storage });


export default function productsRoutes(server) {
  server
    .get('/rest-api/product', checkAuth, ProductController.productsList)
    .get('/rest-api/product/:id', checkAuth, ProductController.productLoad)
    .put('/rest-api/product', checkAuth, ProductController.productSave)
    .put('/rest-api/product-image', checkAuth, upload.single('productLogo'), ProductController.productImageSave)
    .put('/rest-api/modify-image', checkAuth, upload.any(), ProductController.modify)
    .put('/rest-api/products/sorting', checkAuth, ProductController.setSorting)
    .delete('/rest-api/product/:id', checkAuth, ProductController.deleteProduct)
    .delete('/rest-api/product-spicy/:id', checkAuth, ProductController.deleteSpicy)
}
