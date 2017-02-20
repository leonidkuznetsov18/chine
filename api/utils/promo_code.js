/**
 * ATM we use 3 different types of promo codes.
 * Every promo code have 5 requirement fields:
 *
 * - expire_date : promo code cannot be applied if
 * expire date is less than now
 *
 * - min_order_sum : promo code cannot be applied
 * if order sum is less than requirement
 *
 * - bundle_main_id : used to indicate type and id
 * of product required to be present in `bundle` type promo code.
 *
 * - discount_product_id : used to indicate type and id
 * of product apply discount at in `bundle` and `single_order` promo
 * code types.
 *
 * - status : indicates is promo code active/inactive.
 *
 * The main concept of this arch is to provide a flexible way
 * to extend system with promo codes. Admin can combine requirements
 * in any way. For example it's possible to create promo code which
 * reduces price of up to 5 chickens ( chickens above will have
 * standart price ) if there is some kind of soup present in order.
 *
 * For most cases null value means `infinite`. But there's some exceptions:
 * - in `bundle` type null value for `max_discount_products` means that
 * discount will be applied at number of main bundle products.
 * - in `bundle` type null value for `value` means that discount products
 * will be free.
 *
 *
 * Need to move promo code displaying logic from containers here.
 */

import moment from 'moment';

const calculateOrderSum = (orders) => {
  return orders.reduce((productsSum, order) => {
    let _productsSum = productsSum;
    const modifiersPrice = order.order_modifiers.reduce(
      (modifierSum, modifier) => {
        let _modifierSum = modifierSum;
        if (modifier.modifier.type === 'spiciness') {
          return _modifierSum;
        }
        return ( _modifierSum += modifier.modifier.price);
      }, 0);
    return (_productsSum += (
      order.count * order.product.price + modifiersPrice
    ));
  }, 0);
};

export const productOrExtraInOrder = (orders, value) => {
  return orders.filter(order => order.product_id === value && order.count > 0);
};

const fieldValidators = {
  'expire_date': (cart, value) => moment(value).unix() > moment().unix(),
  'min_order_sum': (cart, value) => calculateOrderSum(cart.orders) >= value,
  'bundle_main_id': (cart, value) => productOrExtraInOrder(cart.orders, value).length,
  'discount_product_id': (cart, value) => productOrExtraInOrder(cart.orders, value).length,
  'status': (cart, value) => value,
  'max_number_of_usages': (cart, value) => value > 0
};

const getErrors = (promoCode, invalidFields) => {
  return invalidFields.map(field => {
    switch (field) {
      case 'expire_date':
        return 'This promo code has expired';
      case 'min_order_sum':
        return `THIS PROMO CODE REQUIRES AN ORDER MINIMUM OF $${promoCode.min_order_sum}`;
      case 'status':
        return 'This promo code is inactive';
      case 'bundle_main_id':
        return 'In order to activate this promo code add required products';
      case 'discount_product_id':
        return 'In order to activate this promo code add required products';
      case 'max_number_of_usages':
        return 'Sorry, you exceeded number of activations for this promo code';
    }
  });
};

const typeValidators = {
  order: ['expire_date', 'min_order_sum', 'max_number_of_usages'],
  single_product: ['expire_date', 'min_order_sum', 'discount_product_id', 'max_number_of_usages'],
  bundle: Object.keys(fieldValidators)
};

export const applyPromoCode = (promoCode, cart) => {
  const errorsAccumulator = [];
  typeValidators[promoCode.type].map(validator => {
    const promoCodeField = promoCode[validator];
    if (
        (promoCodeField || promoCodeField === 0) &&
        !fieldValidators[validator](cart, promoCodeField)
    ) {
      errorsAccumulator.push(validator);
    }
  });
  if (!promoCode.status) {
    errorsAccumulator.push('status');
  }
  return getErrors(promoCode, errorsAccumulator);
};
