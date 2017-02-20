import moment from 'moment';
import db from '../../models';

const
  MIN = 11,
  MAX = 23,
  VISIBLE_RANGE = 5;

function calculateTimeRange(asapTime, tz) {

  let startTime = moment.utc().add('hours', tz).add('minutes', asapTime).hour();
  const timeInRange = startTime >= MIN && startTime < MAX;

  if (!timeInRange) {
    startTime = MIN;
  }
  startTime = startTime > (MAX - VISIBLE_RANGE) ? MAX - VISIBLE_RANGE : startTime;

  let endTime = startTime + VISIBLE_RANGE;

  return [startTime, endTime, timeInRange];
}

function generateMarks(start, end, step, asapTime, tz, timeInRange) {
  const globalLower = moment.utc().add(tz, 'hours').add('minutes', asapTime).unix();
  const accumulator = {};
  let itemIndex = 0;
  for (let i = start; i < end; i++){
    let lower = moment.utc().add(tz, 'hours').set('hours', i).set('minutes', 0);
    let upper = moment.utc().add(tz, 'hours').set('hours', i).set('minutes', step);
    accumulator[itemIndex] = {
      style: {},
      label: lower.format('h A'),
      value: upper,
      tooltip: `${lower.format('h:mm A')} - ${upper.format('h:mm A')}`,
      enabled: globalLower < lower.unix()
    };
    itemIndex++;
    for (let k = step; k < 60; k += step){
      let lower = moment.utc().add(tz, 'hours').set('hours', i).set('minutes', k);
      let upper = moment.utc().add(tz, 'hours').set('hours', i).set('minutes', k + step);
      accumulator[itemIndex] = {
        style: {display: 'none'},
        label: lower.format('h A'),
        value: moment.utc().add(tz, 'hours').set('hours', i).set('minutes', k + step),
        tooltip: `${lower.format('h:mm A')} - ${upper.format('h:mm A')}`,
        enabled: globalLower < lower.unix()
      };
      itemIndex++;
    }
  }
  let lower = moment.utc().add(tz, 'hours').set('hours', end).set('minutes', 0);
  let upper = moment.utc().add(tz, 'hours').set('hours', end).set('minutes', step);
  accumulator[itemIndex] = {
    style: {},
    label: lower.format('h A'),
    value: upper,
    tooltip: `${lower.format('h:mm A')} - ${upper.format('h:mm A')}`,
    enabled: globalLower < lower.unix()
  };
  const first = Object.keys(accumulator).find(i => accumulator[i].enabled);
  if (first && timeInRange) {
    accumulator[first].tooltip = `ASAP: up to ${asapTime} minutes`;
  }
  return accumulator;
}

export default function() {
  return db.config.findOne().then(config => {
    const [
      carry_out_start,
      carry_out_end,
      carry_timeInRange
    ] = calculateTimeRange(config.carry_out_asap_time, config.timezone);
    const [
      delivery_start,
      delivery_end,
      delivery_timeInRange
    ] = calculateTimeRange(config.asap_time, config.timezone);
    return {
      'carry_out': generateMarks(
        carry_out_start, carry_out_end, 20, config.carry_out_asap_time, config.timezone, carry_timeInRange
      ),
      'delivery': generateMarks(
        delivery_start, delivery_end, 20, config.asap_time, config.timezone, delivery_timeInRange
      )
    };
  });
}
