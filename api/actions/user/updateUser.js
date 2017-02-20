import db from '../../models';
import crypto from 'crypto';

function _formatData(data) {
  let resp = {is_active: data.is_active};
  for (const key in data) {
    if (key === 'firstName') {
       resp['first_name'] = data[key];
    } else if (key === 'lastName') {
      resp['last_name'] = data[key];
    } else if (key === 'password') {
      resp['password'] = crypto.createHash('sha256')
        .update(data[key])
        .digest('hex');
    } else {
      resp[key] = data[key];
    }
  }
  return resp;
}

export default async function update(req) {
  const { userId, data } = req.body;
  const user = await db.user.findById(userId);
  const formattedData = _formatData(data);
  return await user.update(formattedData);
}
