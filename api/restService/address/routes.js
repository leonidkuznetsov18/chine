import AddressController from './address.controller';
import checkAuth from '../checkAuth';

export default function addressRoutes(server) {
  server
    .get('/rest-api/address', checkAuth, AddressController.addressList)
    .get('/rest-api/address/:id', checkAuth, AddressController.addressLoad)
    .put('/rest-api/address', checkAuth, AddressController.addressEdit)
    .delete('/rest-api/address', checkAuth, AddressController.addressDelete)
}
