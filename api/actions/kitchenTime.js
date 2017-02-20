import moment from 'moment';
import db from '../models';

const
  MIN = 11,
  MAX = 23,
  VISIBLE_RANGE = 5;

export default async function kitchenTime(req, res) {
  const config = await db.config.findOne();
  const {timezone, carry_out_asap_time, asap_time} = config;
  let upperAsapTime;
  if (carry_out_asap_time > asap_time) {
    upperAsapTime = carry_out_asap_time;
  } else if (asap_time > carry_out_asap_time) {
    upperAsapTime = asap_time;
  } else {
    upperAsapTime = carry_out_asap_time;
  }
  const startTime = moment.utc().add('hours', timezone).add('minutes', upperAsapTime).hour();
  const timeInRange = startTime >= MIN && startTime < MAX;
  return timeInRange;
}
