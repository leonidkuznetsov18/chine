import nock from 'nock';
import createMiddleware from '../../middleware/clientMiddleware';
import configureMockStore from 'redux-mock-store'
import ApiClient from '../../../helpers/testApiClient';

import * as cartReducer from '../cart';
import reducer from '../cart';

const client = new ApiClient();

const mockStore = configureMockStore([createMiddleware(client)]);

const cartMock = {
  id: 1
};

const errorMock = {
  error: 'error'
};

const store = mockStore({
  loaded: false,
  item: {}
});

describe('reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      loaded: false,
      loading: true,
      item: {}
    })
  });

  it('should handle `LOAD` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.LOAD
      })
    ).toEqual({
      item: {},
      loading: true,
      loaded: false,
      promoCodeErrors: []
    })
  });

  it('should handle `LOAD_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.LOAD_SUCCESS,
        result: cartMock
      })
    ).toEqual({
      loading: false,
      loaded: true,
      item: {
        id: 1
      }
    })
  });

  it('should handle `LOAD_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.LOAD_FAIL,
        error: errorMock
      })
    ).toEqual({
      item: {},
      loading: false,
      loaded: false,
      error: {
        error: 'error'
      }
    })
  });

  it('should handle `SAVE` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.SAVE
      })
    ).toEqual({
      item: {},
      loaded: false,
      loading: true
    })
  });

  it('should handle `SAVE_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.SAVE_SUCCESS,
        result: cartMock
      })
    ).toEqual({
      loading: false,
      loaded: true,
      item: {
        id: 1
      }
    })
  });

  it('should handle `SAVE_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.SAVE_FAIL,
        error: errorMock
      })
    ).toEqual({
      loading: false,
      loaded: false,
      error: {
        error: 'error'
      },
      item: {}
    })
  });

  it('should handle `UPDATE` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.UPDATE
      })
    ).toEqual({
      item: {},
      loaded: false,
      loading: true
    })
  });

  it('should handle `UPDATE_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.UPDATE_SUCCESS,
        result: cartMock
      })
    ).toEqual({
      loading: false,
      loaded: true,
      item: {
        id: 1
      }
    })
  });

  it('should handle `UPDATE_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.UPDATE_FAIL,
        error: errorMock
      })
    ).toEqual({
      loading: false,
      loaded: false,
      error: {
        error: 'error'
      },
      item: {}
    })
  });

  it('should handle `PAY` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.PAY
      })
    ).toEqual({
      loading: true,
      loaded: false,
      preloader: true,
      item: {}
    })
  });

  it('should handle `PAY_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.PAY_SUCCESS,
        loading: false,
        loaded: true,
        preloader: false,
        item: {}
      })
    )
  });

  it('should handle `PAY_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.PAY_FAIL,
        error: errorMock
      })
    ).toEqual({
      loading: false,
      loaded: false,
      preloader: false,
      error: {
        error: 'error'
      },
      item: {}
    })
  });

  it('should handle `STATUS_CHANGE` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.STATUS_CHANGE,
        cart: cartMock
      })
    ).toEqual({
      loaded: false,
      loading: true,
      item: {
        id: 1
      }
    })
  });

  it('should handle `SET_TIME` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.SET_TIME,
        value: 777
      })
    ).toEqual({
      loaded: false,
      loading: true,
      item: {},
      timeValue: 777
    });
  });

  it('should handle `UPDATE_NOTES` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.UPDATE_NOTES,
        value: '777'
      })
    ).toEqual({
      loaded: false,
      loading: true,
      item: {},
      notes: '777'
    });
  });

  it('should handle `APPLY_PROMO_CODE` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.APPLY_PROMO_CODE
      })
    ).toEqual({
      promoCodeErrors: [],
      loaded: false,
      loading: true,
      item: {}
    })
  });

  it('should handle `APPLY_PROMO_CODE_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.APPLY_PROMO_CODE_SUCCESS,
        result: cartMock
      })
    ).toEqual({
      loaded: false,
      loading: false,
      item: {
        id: 1
      }
    })
  });

  it('should handle `APPLY_PROMO_CODE_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.APPLY_PROMO_CODE_FAIL,
        error: errorMock
      })
    ).toEqual({
      promoCodeErrors: {
        error: 'error'
      },
      loaded: false,
      loading: false,
      item: {}
    })
  });

  it('should handle `REMOVE_PROMO_CODE` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.REMOVE_PROMO_CODE
      })
    ).toEqual({
      loaded: false,
      item: {},
      loading: true
    })
  });

  it('should handle `REMOVE_PROMO_CODE_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.REMOVE_PROMO_CODE_SUCCESS,
        result: cartMock
      })
    ).toEqual({
      loaded: false,
      loading: false,
      item: {
        id: 1
      }
    })
  });

  it('should handle `REMOVE_PROMO_CODE_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.REMOVE_PROMO_CODE_FAIL,
        error: errorMock
      })
    ).toEqual({
      item: {},
      loaded: false,
      loading: false,
      error: {error: 'error'}
    })
  });

  it('should handle `REMOVE_PROMO_CODE_ERRORS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.REMOVE_PROMO_CODE_ERRORS
      })
    ).toEqual({
      item: {},
      loaded: false,
      loading: true,
      promoCodeErrors: []
    })
  });

  it('should handle `TOGGLE_PICKUP` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.TOGGLE_PICKUP
      })
    ).toEqual({
      loaded: false,
      loading: true,
      item: {}
    })
  });

  it('should handle `TOGGLE_PICKUP_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.TOGGLE_PICKUP_SUCCESS,
        result: cartMock
      })
    ).toEqual({
      loading: false,
      loaded: true,
      item: {
        id: 1
      }
    })
  });

  it('should handle `TOGGLE_PICKUP_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.TOGGLE_PICKUP_FAIL
      })
    ).toEqual({
      item: {},
      loaded: false,
      loading: false
    })
  });

  it('should handle `GET_MARKS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.GET_MARKS
      })
    ).toEqual({
      item: {},
      loading: true,
      loaded: false
    })
  });

  it('should handle `GET_MARKS_SUCCESS` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.GET_MARKS_SUCCESS,
        result: {status: 'ok'}
      })
    ).toEqual({
      item: {},
      loading: false,
      loaded: true,
      sliderMarks: {status: 'ok'}
    })
  });

  it('should handle `GET_MARKS_FAIL` type', () => {
    expect(
      reducer(undefined, {
        type: cartReducer.GET_MARKS_FAIL,
        error: {status: 'err'}
      })
    ).toEqual({
      item: {},
      loaded: false,
      loading: false
    })
  })
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('should dispatch `LOAD_SUCCESS` type after `LOAD` type ' +
    'when calling `cartLoad` if response status < 400', () => {
    nock('http://test:777/')
      .get('/cart/load')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.LOAD
      },
      {
        type: cartReducer.LOAD_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.cartLoad())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `LOAD_FAIL` type after `LOAD` type ' +
    'when calling `cartLoad` if response  status > 400', () => {
    nock('http://test:777/')
      .get('/cart/load')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.LOAD
      },
      {
        type: cartReducer.LOAD_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.cartLoad())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `LOAD_SUCCESS` type after `LOAD` type ' +
    'when calling `cartLoadById` if response status < 400', () => {
    nock('http://test:777/')
      .get('/cart/load_by_id')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.LOAD
      },
      {
        type: cartReducer.LOAD_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.cartLoadById())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `LOAD_FAIL` type after `LOAD` type ' +
    'when calling `cartLoadById` if response  status > 400', () => {
    nock('http://test:777/')
      .get('/cart/load_by_id')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.LOAD
      },
      {
        type: cartReducer.LOAD_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.cartLoadById())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `LOAD_SUCCESS` type after `LOAD` type ' +
    'when calling `cartLoadHistory` if response status < 400', () => {
    nock('http://test:777/')
      .get('/cart/load_history')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.LOAD
      },
      {
        type: cartReducer.LOAD_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.cartLoadHistory())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `LOAD_FAIL` type after `LOAD` type ' +
    'when calling `cartLoadHistory` if response  status > 400', () => {
    nock('http://test:777/')
      .get('/cart/load_history')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.LOAD
      },
      {
        type: cartReducer.LOAD_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.cartLoadHistory())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_SUCCESS` type after `SAVE` type ' +
    'when calling `addToCart` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/add_to_cart')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.addToCart())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_FAIL` type after `SAVE` type ' +
    'when calling `addToCart` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/add_to_cart')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.addToCart())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_SUCCESS` type after `SAVE` type ' +
    'when calling `updateAdditionalItems` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/update_additional')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.updateAdditionalItems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_FAIL` type after `SAVE` type ' +
    'when calling `updateAdditionalItems` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/update_additional')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.updateAdditionalItems())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `TOGGLE_PICKUP_SUCCESS` type after `TOGGLE_PICKUP` type ' +
    'when calling `togglePickupOption` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/toggle_pickup')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.TOGGLE_PICKUP
      },
      {
        type: cartReducer.TOGGLE_PICKUP_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.togglePickupOption())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `TOGGLE_PICKUP_FAIL` type after `TOGGLE_PICKUP` type ' +
    'when calling `togglePickupOption` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/toggle_pickup')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.TOGGLE_PICKUP
      },
      {
        type: cartReducer.TOGGLE_PICKUP_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.togglePickupOption())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_SUCCESS` type after `SAVE` type ' +
    'when calling `setDeliveryTime` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/set_time')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.setDeliveryTime())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_FAIL` type after `SAVE` type ' +
    'when calling `setDeliveryTime` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/set_time')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.setDeliveryTime())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `PAY_SUCCESS` type after `PAY` type ' +
    'when calling `pay` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/pay')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.PAY
      },
      {
        type: cartReducer.PAY_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.pay())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `PAY_FAIL` type after `PAY` type ' +
    'when calling `pay` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/pay')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.PAY
      },
      {
        type: cartReducer.PAY_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.pay())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `PAY_SUCCESS` type after `PAY` type ' +
    'when calling `payAuthorized` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/pay_authorized')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.PAY
      },
      {
        type: cartReducer.PAY_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.payAuthorized())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `PAY_FAIL` type after `PAY` type ' +
    'when calling `payAuthorized` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/pay_authorized')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.PAY
      },
      {
        type: cartReducer.PAY_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.payAuthorized())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `APPLY_PROMO_CODE_SUCCESS` type after `APPLY_PROMO_CODE` type ' +
    'when calling `applyPromoCode` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/apply_promo_code')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.APPLY_PROMO_CODE
      },
      {
        type: cartReducer.APPLY_PROMO_CODE_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.applyPromoCode())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `APPLY_PROMO_CODE_FAIL` type after `APPLY_PROMO_CODE` type ' +
    'when calling `applyPromoCode` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/apply_promo_code')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.APPLY_PROMO_CODE
      },
      {
        type: cartReducer.APPLY_PROMO_CODE_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.applyPromoCode())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `REMOVE_PROMO_CODE_SUCCESS` type after `REMOVE_PROMO_CODE` type ' +
    'when calling `removePromoCode` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/remove_promo_code')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.REMOVE_PROMO_CODE
      },
      {
        type: cartReducer.REMOVE_PROMO_CODE_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.removePromoCode())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `REMOVE_PROMO_CODE_FAIL` type after `REMOVE_PROMO_CODE` type ' +
    'when calling `removePromoCode` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/remove_promo_code')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.REMOVE_PROMO_CODE
      },
      {
        type: cartReducer.REMOVE_PROMO_CODE_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.removePromoCode())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_SUCCESS` type after `SAVE` type ' +
    'when calling `changeProductsCounter` if response status < 400', () => {
    nock('http://test:777/')
      .post('/order/change_count')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.changeProductsCounter())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `SAVE_FAIL` type after `SAVE` type ' +
    'when calling `changeProductsCounter` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/order/change_count')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.SAVE
      },
      {
        type: cartReducer.SAVE_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.changeProductsCounter())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `VOID_SUCCESS` type after `VOID` type ' +
    'when calling `voidTransaction` if response status < 400', () => {
    nock('http://test:777/')
      .post('/cart/void_transaction')
      .reply(200, cartMock);

    const expectedActions = [
      {
        type: cartReducer.VOID
      },
      {
        type: cartReducer.VOID_SUCCESS,
        result: cartMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.voidTransaction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `VOID_FAIL` type after `VOID` type ' +
    'when calling `changeProductsCounter` if response  status > 400', () => {
    nock('http://test:777/')
      .post('/cart/void_transaction')
      .reply(500, errorMock);

    const expectedActions = [
      {
        type: cartReducer.VOID
      },
      {
        type: cartReducer.VOID_FAIL,
        error: errorMock
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.voidTransaction(1))
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `GET_MARKS_SUCCESS` type after `GET_MARKS` type ' +
    'when calling `getSliderMarks` if response status < 400', () => {
    nock('http://test:777/')
      .get('/cart/get_slider_marks')
      .reply(200, {status: 'ok'});

    const expectedActions = [
      {
        type: cartReducer.GET_MARKS
      },
      {
        type: cartReducer.GET_MARKS_SUCCESS,
        result: {status: 'ok'}
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.getSliderMarks())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('should dispatch `GET_MARKS_FAIL` type after `GET_MARKS` type ' +
    'when calling `getSliderMarks` if response  status > 400', () => {
    nock('http://test:777/')
      .get('/cart/get_slider_marks')
      .reply(500, {status: 'err'});

    const expectedActions = [
      {
        type: cartReducer.GET_MARKS
      },
      {
        type: cartReducer.GET_MARKS_FAIL,
        error: {status: 'err'}
      }
    ];

    store.clearActions();

    return store.dispatch(cartReducer.getSliderMarks())
      .then(() => {})
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });
});

describe('synch actions', () => {

  it('should dispatch `STATUS_CHANGE` type', () => {

    const expectedActions = [
      {
        type: cartReducer.STATUS_CHANGE,
        cart: cartMock
      }
    ];

    store.clearActions();

    store.dispatch(cartReducer.cartStatusUpdated(cartMock));
    expect(store.getActions()).toEqual(expectedActions)
  });

  it('should dispatch `REMOVE_PROMO_CODE_ERRORS` type', () => {

    const expectedActions = [
      {
        type: cartReducer.REMOVE_PROMO_CODE_ERRORS
      }
    ];

    store.clearActions();

    store.dispatch(cartReducer.clearPromoCodeErrors());
    expect(store.getActions()).toEqual(expectedActions)
  })
});
