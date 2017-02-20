import config from '../../config';
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock';

const CryptoJS = require('crypto-js');

import { applyPromoCode } from './../promo_code';
import {
  getDrivers,
  createBringTask
} from './../bringg';
import encrypt from './../encrypt';
import decrypt from './../decrypt';

import {
  cart,
  order,
  single,
  bundle
} from './../../__mocks__/promo_code';

import {
  carts
} from './../../__mocks__/bringg';

beforeAll(() => {
  axios.defaults.adapter = httpAdapter;
});

describe('validate `order` type promo code', () => {
  
  it('should apply promo code', () => {
    expect(applyPromoCode(order.orderNormal, cart).length).toEqual(0)
  });
  it('should not apply promo code and return expired error', () => {
    expect(applyPromoCode(order.orderExpired, cart)).toEqual(
      ['This promo code has expired']
    )
  });
  it('should not apply promo code and return inactive error', () => {
    expect(applyPromoCode(order.orderInactive, cart)).toEqual(
      ['This promo code is inactive']
    )
  });
  it('should not apply promo code and return limit error', () => {
    expect(applyPromoCode(order.orderLimit, cart)).toEqual(
      ['Sorry, you exceeded number of activations for this promo code']
    )
  });
  it('should not apply promo code and return minimum order sum error', () => {
    expect(applyPromoCode(order.orderSum, cart)).toEqual(
      ['THIS PROMO CODE REQUIRES AN ORDER MINIMUM OF $777']
    )
  })
});

describe('validate `single_product` type promo code', () => {
  
  it('should apply promo code', () => {
    expect(applyPromoCode(single.orderNormal, cart).length).toEqual(0)
  });
  it('should not apply promo code and return missing discount id error', () => {
    expect(applyPromoCode(single.orderProductId, cart)).toEqual(
      ['In order to activate this promo code add required products']
    )
  });
  it('should not apply promo code and return expired error', () => {
    expect(applyPromoCode(single.orderExpired, cart)).toEqual(
      ['This promo code has expired']
    )
  });
  it('should not apply promo code and return inactive error', () => {
    expect(applyPromoCode(single.orderInactive, cart)).toEqual(
      ['This promo code is inactive']
    )
  });
  it('should not apply promo code and return limit error', () => {
    expect(applyPromoCode(single.orderLimit, cart)).toEqual(
      ['Sorry, you exceeded number of activations for this promo code']
    )
  });
  it('should not apply promo code and return minimum order sum error', () => {
    expect(applyPromoCode(single.orderSum, cart)).toEqual(
      ['THIS PROMO CODE REQUIRES AN ORDER MINIMUM OF $777']
    )
  })
});

describe('validate `bundle` type promo code', () => {
  
  it('should apply promo code', () => {
    expect(applyPromoCode(bundle.orderNormal, cart).length).toEqual(0)
  });
  it('should not apply promo code and return missing bundle main id error', () => {
    expect(applyPromoCode(bundle.orderBundleMainId, cart)).toEqual(
      ['In order to activate this promo code add required products']
    )
  });
  it('should not apply promo code and return missing discount id error', () => {
    expect(applyPromoCode(bundle.orderProductId, cart)).toEqual(
      ['In order to activate this promo code add required products']
    )
  });
  it('should not apply promo code and return expired error', () => {
    expect(applyPromoCode(bundle.orderExpired, cart)).toEqual(
      ['This promo code has expired']
    )
  });
  it('should not apply promo code and return inactive error', () => {
    expect(applyPromoCode(bundle.orderInactive, cart)).toEqual(
      ['This promo code is inactive']
    )
  });
  it('should not apply promo code and return limit error', () => {
    expect(applyPromoCode(bundle.orderLimit, cart)).toEqual(
      ['Sorry, you exceeded number of activations for this promo code']
    )
  });
  it('should not apply promo code and return minimum order sum error', () => {
    expect(applyPromoCode(bundle.orderSum, cart)).toEqual(
      ['THIS PROMO CODE REQUIRES AN ORDER MINIMUM OF $777']
    )
  })
});

describe('bringg utilities', () => {
  afterEach(() => {
    nock.cleanAll()
  });
  
  it('should handle `drivers` GET request', () => {
    nock('https://developer-api.bringg.com/')
      .filteringPath(function (path) {
        return '/'
      })
      .get('/')
      .reply(200, {
        status: 'ok'
      });
    
    return getDrivers().then((res) => {
      expect(res).toEqual({status: 'ok'})
    })
  });
  
  it('should handle `create task` POST request', () => {
    nock('https://admin-api.bringg.com/')
      .filteringPath(function (path) {
        return '/'
      })
      .post('/')
      .reply(200, {
        status: 'ok'
      });
    
    return createBringTask(carts, 1).then((res) => {
      expect(res.data).toEqual({status: 'ok'})
    })
  })
});

describe('encrypt/decrypt', () => {
  
  it('should encrypt string', () => {
    expect(encrypt('test777')).toEqual('ea525496b8a42c1a4a8ebfc0c1fd0ebb')
  });
  
  it('should decrypt string', () => {
    expect(decrypt('ea525496b8a42c1a4a8ebfc0c1fd0ebb')).toEqual('test777')
  })
});