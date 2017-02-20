import _ from 'lodash';

Number.prototype.pad = function(n) {
  return new Array(n).join('0').slice((n || 2) * -1) + this;
};


export class GroupController {

  constructor() {
    this.pool = this.generatePool();
  }

  generatePool = () => {
    const pool = [];
    for (let i = 1; i < 100; i++) {
      pool.push({
        id: `G${i.pad(2)}`,
        free: true,
      })
    }
    return pool
  };

  reserve = () => {
    const obj = _.find(this.pool, {free: true});
    obj.free = false;
    return obj
  };

  release = (id) => {
    const obj = _.find(this.pool, {id: id});
    obj.free = true
  }
}