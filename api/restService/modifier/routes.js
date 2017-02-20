import ModifierController from './modifier.controller';
import checkAuth from '../checkAuth';

import multer from 'multer'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: `${process.cwd()}/static/uploads/modifiers`,
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);
      cb(null, `${raw.toString('hex')}.${file.originalname}`);
    })
  }
});

const upload = multer({ storage });

export default function modifierRoutes(server) {
  server
    .get('/rest-api/modifier', checkAuth, ModifierController.modifiersList)
    .get('/rest-api/modifier/:id', checkAuth, ModifierController.modifierLoad)
    .put('/rest-api/modifier/', checkAuth, upload.single('modifierIcon'), ModifierController.modifierEdit)
    .delete('/rest-api/modifier/:id', checkAuth, ModifierController.modifierDelete)
}

