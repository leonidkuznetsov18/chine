import ConfigController from './config.controller';
import checkAuth from '../checkAuth';
import multer from 'multer'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: `${process.cwd()}/static/uploads/splash_screen`,
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);

      cb(null, `${raw.toString('hex')}.${file.originalname}`);
    })
  }
});

const upload = multer({ storage: storage });

export default function cartRoutes(server) {
  server
    .get('/rest-api/config', checkAuth, ConfigController.configLoad)
    .put('/rest-api/config', checkAuth, upload.single('splashScreen'), ConfigController.configEdit)
}
