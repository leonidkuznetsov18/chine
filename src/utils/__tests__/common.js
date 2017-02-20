import _ from 'lodash';

import * as validationFunctions from './../validation';
import cartCalculator from './../cartCalculator';

import {
  promoCodeOrder,
  promoCodeDiscountWithMaxNumber,
  promoCodeDiscountWOMaxNumber,
  promoCodeDiscountWithMaxNumberWODiscountValue,
  promoCodeDiscountWOMaxNumberWODiscountValue,
  promoCodeBundleWithMaxNumber,
  promoCodeBundleWOMaxNumber,
  promoCodeBundleWithMaxNumberWODiscountValue,
  promoCodeBundleWOMaxNumberWODiscountValue
} from '../../__mocks__/cart';


describe('validation functions', () => {
  
  it('should return true if there`s no value', () => {
    expect(validationFunctions.isEmpty(undefined)).toEqual(true);
    expect(validationFunctions.isEmpty(null)).toEqual(true);
    expect(validationFunctions.isEmpty('')).toEqual(true);
  });
  
  it('EMAIL: should return error message or undefined', () => {
    expect(validationFunctions.email('777@test.com')).toEqual(undefined);
    expect(validationFunctions.email('777')).toEqual('Invalid email address')
  });
  
  it('PASSWORD: should return error message or undefined', () => {
    expect(validationFunctions.password(5)('777-777')).toEqual(undefined);
    expect(validationFunctions.password(5)('777')).toEqual(
      'Password should contain 5 characters'
    )
  });
  
  it('REQUIRED: should return error message or undefined', () => {
    expect(validationFunctions.required('777')).toEqual(undefined);
    expect(validationFunctions.required('')).toEqual('is required')
  });
  
  it('MIN LENGTH: should return error message or undefined', () => {
    expect(validationFunctions.minLength(5)('777-777')).toEqual(undefined);
    expect(validationFunctions.minLength(5)('777')).toEqual(
      'Must be at least 5 characters'
    )
  });
  
  it('REQUIRED FIELD: should return error message or undefined', () => {
    expect(validationFunctions.requiredField('field')('777')).toEqual(undefined);
    expect(validationFunctions.requiredField('field')('')).toEqual(
      'field is required'
    )
  });
  
  it('MAX LENGTH: should return error message or undefined', () => {
    expect(validationFunctions.maxLength(5)('777')).toEqual(undefined);
    expect(validationFunctions.maxLength(5)('777-777')).toEqual(
      'Must be no more than 5 characters'
    )
  });
  
  it('MATCH LENGTH: should return error message or undefined', () => {
    expect(validationFunctions.matchLenght(3, 'field')('777')).toEqual(undefined);
    expect(validationFunctions.matchLenght(3, 'field')('777-777')).toEqual(
      'field should contain  3 characters'
    )
  });
  
  it('PHONE VALID: should return error message or undefined', () => {
    expect(validationFunctions.phoneValid(5, 'field')('5-5-5-5-5')).toEqual(undefined);
    expect(validationFunctions.phoneValid(5, 'field')('7-7-7')).toEqual(
      'field is invalid'
    )
  });
  
  it('INTEGER: should return error message or undefined', () => {
    expect(validationFunctions.integer(777)).toEqual(undefined);
    expect(validationFunctions.integer('a')).toEqual('Must be an integer')
  });
  
  it('ONE OF: should return error message or undefined', () => {
    expect(validationFunctions.oneOf(['1', '2', '3'])('1')).toEqual(undefined);
    expect(validationFunctions.oneOf(['1', '2', '3'])('777')).toEqual(
      'Must be one of: 1, 2, 3'
    )
  });
  
  it('MATCH: should return error message or undefined', () => {
    expect(validationFunctions.match('field')('777', {field: '777'})).toEqual(undefined);
    expect(validationFunctions.match('field')('777', {field: 777})).toEqual(
      'Do not match'
    )
  })
});

describe('cart calculator: cart with `order` type promo code', () => {
  
  const cartProps = new cartCalculator(promoCodeOrder);
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(promoCodeOrder)
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(46.2);
    expect(parsedCart.discount).toEqual(
      promoCodeOrder.promo_code.value
    );
    expect(parsedCart.items).toEqual(
      [
        {
          "count":1,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1234,
          "price":10,
          "type":"product"
        },
        {
          "count":1,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1232,
          "price":11,
          "type":"product"
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":538,
              "modifier":{
                "id":5,
                "img":null,
                "name":"spiciness",
                "price":0,
                "type":"spiciness"
              },
              "modifier_id":5,
              "order_id":1233,
              "value":3
            },
            {
              "id":539,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1233,
              "value":1
            },
            {
              "id":540,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1233,
              "value":1
            },
            {
              "id":541,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1233,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1233,
          "price":25.2,
          "type":"product"
        },
      ]
    )
  })
});

describe('cart calculator: cart with `discount` type promo code ' +
  'with maximum number of discount products and with discount value', () => {
  
  const cartProps = new cartCalculator(promoCodeDiscountWithMaxNumber);
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(promoCodeDiscountWithMaxNumber)
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(68.2);
    expect(parsedCart.discount).toEqual(10);
    expect(parsedCart.items).toEqual(
      [
        {
          "count":1,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1237,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":5,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1235,
          "price":11,
          "type":"product",
          "withDiscount":2
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":542,
              "modifier":{
                "id":5,
                "img":null,
                "name":"spiciness",
                "price":0,
                "type":"spiciness"
              },
              "modifier_id":5,
              "order_id":1236,
              "value":2
            },
            {
              "id":543,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1236,
              "value":1
            },
            {
              "id":544,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1236,
              "value":1
            },
            {
              "id":545,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1236,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1236,
          "price":25.2,
          "type":"product"
        },
      ]
    );
    
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeDiscountWithMaxNumber.promo_code.discount_product_id
    });
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      promoCodeDiscountWithMaxNumber.promo_code.max_discount_products
    );
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      itemWithDiscount.count
    )
  })
});

describe('cart calculator: cart with `discount` type promo code ' +
  'w/o maximum number of discount products and with discount value', () => {
  
  const cartProps = new cartCalculator(promoCodeDiscountWOMaxNumber);
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(promoCodeDiscountWOMaxNumber)
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(68.2);
    expect(parsedCart.discount).toEqual(15);
    expect(parsedCart.items).toEqual(
      [
        {
          "count":1,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1237,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":5,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1235,
          "price":11,
          "type":"product",
          "withDiscount":3
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":542,
              "modifier":{
                "id":5,
                "img":null,
                "name":"spiciness",
                "price":0,
                "type":"spiciness"
              },
              "modifier_id":5,
              "order_id":1236,
              "value":2
            },
            {
              "id":543,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1236,
              "value":1
            },
            {
              "id":544,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1236,
              "value":1
            },
            {
              "id":545,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1236,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1236,
          "price":25.2,
          "type":"product"
        }
      ]
    );
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeDiscountWOMaxNumber.promo_code.discount_product_id
    });
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(itemWithDiscount.withDiscount).toEqual(itemWithDiscount.count);
  })
});

describe('cart calculator: cart with `discount` type promo code ' +
  'with maximum number of discount products and w/o discount value', () => {
  
  const cartProps = new cartCalculator(
    promoCodeDiscountWithMaxNumberWODiscountValue
  );
  
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(
      promoCodeDiscountWithMaxNumberWODiscountValue
    );
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(68.2);
    expect(parsedCart.discount).toEqual(22);
    expect(parsedCart.items).toEqual(
      [
        {
          "count":1,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1237,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":11,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1235,
          "price":11,
          "type":"product",
          "withDiscount":2
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":542,
              "modifier":{
                "id":5,
                "img":null,
                "name":"spiciness",
                "price":0,
                "type":"spiciness"
              },
              "modifier_id":5,
              "order_id":1236,
              "value":2
            },
            {
              "id":543,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1236,
              "value":1
            },
            {
              "id":544,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1236,
              "value":1
            },
            {
              "id":545,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1236,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1236,
          "price":25.2,
          "type":"product"
        }
      ]
    );
    
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeDiscountWithMaxNumberWODiscountValue.promo_code.discount_product_id
    });
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      promoCodeDiscountWithMaxNumberWODiscountValue.promo_code.max_discount_products
    );
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      itemWithDiscount.count
    )
  })
});

describe('cart calculator: cart with `discount` type promo code ' +
  'w/o maximum number of discount products and w/o discount value', () => {
  
  const cartProps = new cartCalculator(
    promoCodeDiscountWOMaxNumberWODiscountValue
  );
  
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(
      promoCodeDiscountWOMaxNumberWODiscountValue
    )
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(108.2);
    expect(parsedCart.discount).toEqual(33);
    expect(parsedCart.items).toEqual(
      [
        {
          "count":5,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1237,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":11,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1235,
          "price":11,
          "type":"product",
          "withDiscount":3
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":542,
              "modifier":{
                "id":5,
                "img":null,
                "name":"spiciness",
                "price":0,
                "type":"spiciness"
              },
              "modifier_id":5,
              "order_id":1236,
              "value":2
            },
            {
              "id":543,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1236,
              "value":1
            },
            {
              "id":544,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1236,
              "value":1
            },
            {
              "id":545,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1236,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1236,
          "price":25.2,
          "type":"product"
        }
      ]
    );
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeDiscountWOMaxNumberWODiscountValue.promo_code.discount_product_id
    });
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(itemWithDiscount.withDiscount).toEqual(itemWithDiscount.count)
  })
});

describe('cart calculator: cart with `bundle` type promo code ' +
  'with maximum number of discount products and with discount value', () => {
    
  const cartProps = new cartCalculator(promoCodeBundleWithMaxNumber);
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(promoCodeBundleWithMaxNumber)
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(68.2);
    expect(parsedCart.discount).toEqual(10);
    
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeBundleWithMaxNumber.promo_code.discount_product_id
    });
    
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      promoCodeBundleWithMaxNumber.promo_code.max_discount_products
    );
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      itemWithDiscount.count
    )
  })
});

describe('cart calculator: cart with `bundle` type promo code ' +
  'w/o maximum number of discount products and with discount value', () => {
  
  const cartProps = new cartCalculator(promoCodeBundleWOMaxNumber);
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(promoCodeBundleWOMaxNumber);
  });
  
  it('should properly calculate order total and discount', () => {
    const parsedCart = cartProps.parseCart();
    expect(parsedCart.total).toEqual(68.2);
    expect(parsedCart.discount).toEqual(5);
    expect(parsedCart.items).toEqual(
      [
        {
          "count":1,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1242,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":5,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1240,
          "price":11,
          "type":"product",
          "withDiscount":1
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":547,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1241,
              "value":1
            },
            {
              "id":548,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1241,
              "value":1
            },
            {
              "id":549,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1241,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1241,
          "price":25.2,
          "type":"product"
        }
      ]
    );
    
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeBundleWOMaxNumber.promo_code.discount_product_id
    });
    
    const bundleMainProduct = _.find(parsedCart.items, {
      id: promoCodeBundleWOMaxNumber.promo_code.bundle_main_id
    });
    
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(bundleMainProduct).not.toEqual(undefined);
    if (bundleMainProduct.count <= itemWithDiscount.count){
      expect(itemWithDiscount.withDiscount).toEqual(bundleMainProduct.count);
    }
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      bundleMainProduct.count
    );
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      itemWithDiscount.count
    )
  })
});

describe('cart calculator: cart with `bundle` type promo code ' +
  'with maximum number of discount products and w/o discount value', () => {
  
  const cartProps = new cartCalculator(
    promoCodeBundleWithMaxNumberWODiscountValue
  );
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(
      promoCodeBundleWithMaxNumberWODiscountValue
    )
  });
  
  const parsedCart = cartProps.parseCart();
  it('should properly calculate order total and discount', () => {
    expect(parsedCart.total).toEqual(68.2);
    expect(parsedCart.discount).toEqual(22);
    expect(parsedCart.items).toEqual(
      [
        {
          "count":1,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1242,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":11,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1240,
          "price":11,
          "type":"product",
          "withDiscount":2
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":547,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1241,
              "value":1
            },
            {
              "id":548,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1241,
              "value":1
            },
            {
              "id":549,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1241,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1241,
          "price":25.2,
          "type":"product"
        }
      ]
    );
    
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeBundleWithMaxNumberWODiscountValue.promo_code.discount_product_id
    });
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      promoCodeBundleWithMaxNumberWODiscountValue.promo_code.max_discount_products
    );
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      itemWithDiscount.count
    )
  })
});

describe('cart calculator: cart with `bundle` type promo code ' +
  'w/o maximum number of discount products and w/o discount value', () => {
  
  const cartProps = new cartCalculator(
    promoCodeBundleWOMaxNumberWODiscountValue
  );
  it('should properly initialize', () => {
    expect(cartProps.rawCart).toEqual(
      promoCodeBundleWOMaxNumberWODiscountValue
    )
  });
  
  const parsedCart = cartProps.parseCart();
  it('should properly calculate order total and discount', () => {
    expect(parsedCart.total).toEqual(108.2);
    expect(parsedCart.discount).toEqual(33);
    expect(parsedCart.items).toEqual(
      [

        {
          "count":5,
          "id":20,
          "modifiers":[],
          "name":"General Tso Chicken",
          "orderId":1242,
          "price":10,
          "type":"product"
        },
        {
          "count":3,
          "discount":11,
          "id":54,
          "modifiers":[],
          "name":"SWEET & SOUR CHICKEN",
          "orderId":1240,
          "price":11,
          "type":"product",
          "withDiscount":3
        },
        {
          "count":1,
          "id":48,
          "modifiers":[
            {
              "id":547,
              "modifier":{
                "id":14,
                "img":"3e7ddee3796c3aa06586b763112ceb58.png",
                "name":"Tofu",
                "price":1,
                "type":"single"
              },
              "modifier_id":14,
              "order_id":1241,
              "value":1
            },
            {
              "id":548,
              "modifier":{
                "id":9,
                "img":null,
                "name":"With Gluten, Gluten Free",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":9,
              "order_id":1241,
              "value":1
            },
            {
              "id":549,
              "modifier":{
                "id":10,
                "img":null,
                "name":"Gluten Free, No Batter",
                "price":1,
                "type":"boolean"
              },
              "modifier_id":10,
              "order_id":1241,
              "value":1
            }
          ],
          "name":"Honey Walnut Shrimp",
          "orderId":1241,
          "price":25.2,
          "type":"product"
        }
      ]
    );
  
    const itemWithDiscount = _.find(parsedCart.items, {
      id: promoCodeBundleWOMaxNumberWODiscountValue.promo_code.discount_product_id
    });
  
    const bundleMainProduct = _.find(parsedCart.items, {
      id: promoCodeBundleWOMaxNumberWODiscountValue.promo_code.bundle_main_id
    });
  
    expect(itemWithDiscount).not.toEqual(undefined);
    expect(bundleMainProduct).not.toEqual(undefined);
    if (bundleMainProduct.count <= itemWithDiscount.count){
      expect(itemWithDiscount.withDiscount).toEqual(bundleMainProduct.count);
    }
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      bundleMainProduct.count
    );
    expect(itemWithDiscount.withDiscount).not.toBeGreaterThan(
      itemWithDiscount.count
    )
  })
});