/**
 * Class for calculating cart sum and applying
 * promo code ( if exists ).
 */
export default class CartCalculator {

  constructor(cart) {
    this.rawCart = cart;
  }

  /**
   * Main method.
   * Collect both products and extras in single
   * array. Also applies discount and discount products counts
   * if ( exists ).
   * @returns {{total: *, items: (*|Array), discount: number}}
   */
  parseCart = () => {
    const products = [];
    const promoCode = this.rawCart.promo_code;
    this.rawCart.orders.map(order => {
      products.push({
        type: order.product.type,
        id: order.product.id,
        count: order.count,
        name: order.product.name,
        price: order.order_modifiers.reduce((c, n) => {
          let _c = c;
          return (_c += n.modifier.price);
        }, order.product.price),
        orderId: order.id,
        modifiers: order.order_modifiers
      });
    });
    this.cartItems = [...products].sort((p1, p2) => {
      return p1.price > p2.price;
    }).map(item => {
      return this.applyDiscountValue(item) || item;
    });
    let totalDiscount = 0;
    if (promoCode && promoCode.type !== 'order') {
      this.cartItems = this.applyDiscountNumber();
      totalDiscount = this.cartItems.reduce((c, n) => {
        let _c = c;
        if (n.discount) {
          return (_c += n.discount * n.withDiscount);
        }
        return (_c += 0);
      }, 0);
    } else if (promoCode && promoCode.type === 'order') {
      totalDiscount = promoCode.value;
    }
    return {
      total: this.cartItems.reduce((c, n) => {
        let _c = c;
        return (_c += n.price * n.count);
      }, 0),
      items: this.cartItems,
      discount: totalDiscount
    };
  };

  /**
   * Applies discount value for `bundle` and `single_type`
   * promo codes for single product.
   * @param item
   * @returns {*}
   */
  applyDiscountValue = (item) => {
    const promoCode = this.rawCart.promo_code;
    if (promoCode && item.id === promoCode.discount_product_id) {
      return {
        ...item,
        discount: promoCode.value || item.price
      };
    }
    return false;
  };

  applyDiscountNumber = () => {
    const promoCode = this.rawCart.promo_code;
    switch (promoCode.type) {
      case 'single_product':
        if (!promoCode.max_discount_products) {
          return this.cartItems.map(cartItem => {
            if (cartItem.discount) {
              return {
                ...cartItem,
                withDiscount: cartItem.count
              };
            }
            return cartItem;
          });
        }
        let discountsLeft = promoCode.max_discount_products;
        return this.cartItems.map(cartItem => {
          if (cartItem.discount) {
            const withDiscount = discountsLeft > cartItem.count ?
              cartItem.count : discountsLeft;
            discountsLeft -= withDiscount;
            return {
              ...cartItem,
              withDiscount: withDiscount
            };
          }
          return cartItem;
        });
      case 'bundle':
        if (!promoCode.max_discount_products) {
          const bundleMainId = promoCode.bundle_main_id;
          let discountsLeft = this.cartItems.reduce((c, n) => {
            let _c = c;
            if ( n.id === bundleMainId) {
              return (_c += n.count);
            }
            return _c;
          }, 0);
          return this.cartItems.map(cartItem => {
            if (cartItem.discount) {
              const withDiscount = discountsLeft > cartItem.count ?
                cartItem.count : discountsLeft;
              discountsLeft -= withDiscount;
              return {
                ...cartItem,
                withDiscount: withDiscount
              };
            }
            return cartItem;
          });
        }
        discountsLeft = promoCode.max_discount_products;
        return this.cartItems.map(cartItem => {
          if (cartItem.discount) {
            const withDiscount = discountsLeft > cartItem.count ?
              cartItem.count : discountsLeft;
            discountsLeft -= withDiscount;
            return {
              ...cartItem,
              withDiscount: withDiscount
            };
          }
          return cartItem;
        });
    }
  }
}
