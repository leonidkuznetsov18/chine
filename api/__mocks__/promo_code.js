export const cart = {
  "paid_cart":null,
    "id":934,
    "delivery_time":"2017-01-12T10:00:55.000Z",
    "chopsticks":null,
    "utensils":null,
    "plates":null,
    "user_id":584,
    "address_id":769,
    "status_id":null,
    "card_id":null,
    "order_date":null,
    "amount":null,
    "transaction_id":null,
    "pickup":true,
    "bringg_uiid":null,
    "bringg_driver_id":null,
    "address":{
    "id":769,
      "city":null,
      "street":null,
      "building":null,
      "zip_code":null,
      "company":null,
      "apt_floor":null,
      "notes":null,
      "email":null,
      "user_id":584,
      "is_default":true,
      "out_of_range":true,
      "lat":0,
      "lng":0,
      "distance":8002
  },
  "orders":[
    {
      "id":1233,
      "count":1,
      "product_id":48,
      "is_default":false,
      "address_id":null,
      "cart_order":{
        "cart_id":934,
        "order_id":1233
      },
      "product":{
        "id":48,
        "name":"Honey Walnut Shrimp",
        "price":22.2,
        "short_description":"Damn delicious, large shrimp, raw, peeled and deveined",
        "description":"this dish involves an epic concoction of crispy battered shrimp tossed in a creamy, sweet sauce along with some candy-glazed walnuts. With one pound of shrimp, some walnuts, honey, condensed milk and a bit of mayo, you can easily recreate this on a tight budget.",
        "img":"1afd2c977c76d3d38ff81f143cf4444b.jpg",
        "sorting":3,
        "cook_time":3,
        "category_id":7,
        "badge_id":4,
        "type":"product"
      },
      "order_modifiers":[
        {
          "id":538,
          "value":3,
          "modifier_id":5,
          "order_id":1233,
          "modifier":{
            "id":5,
            "name":"spiciness",
            "price":0,
            "img":null,
            "type":"spiciness"
          }
        },
        {
          "id":539,
          "value":1,
          "modifier_id":14,
          "order_id":1233,
          "modifier":{
            "id":14,
            "name":"Tofu",
            "price":1,
            "img":"3e7ddee3796c3aa06586b763112ceb58.png",
            "type":"single"
          }
        },
        {
          "id":540,
          "value":1,
          "modifier_id":9,
          "order_id":1233,
          "modifier":{
            "id":9,
            "name":"With Gluten, Gluten Free",
            "price":1,
            "img":null,
            "type":"boolean"
          }
        },
        {
          "id":541,
          "value":1,
          "modifier_id":10,
          "order_id":1233,
          "modifier":{
            "id":10,
            "name":"Gluten Free, No Batter",
            "price":1,
            "img":null,
            "type":"boolean"
          }
        }
      ]
    },
    {
      "id":1232,
      "count":1,
      "product_id":54,
      "is_default":true,
      "address_id":null,
      "cart_order":{
        "cart_id":934,
        "order_id":1232
      },
      "product":{
        "id":54,
        "name":"SWEET & SOUR CHICKEN",
        "price":11,
        "short_description":"In a large non-stick skillet, heat oil over medium high heat. Season chicken strips and add to pan. Brown chicken and remove to plate",
        "description":"In a large non-stick skillet, heat oil over medium high heat. Season chicken strips and add to pan. Brown chicken and remove to plate",
        "img":null,
        "sorting":null,
        "cook_time":4,
        "category_id":1,
        "badge_id":4,
        "type":"product"
      },
      "order_modifiers":[
      
      ]
    },
    {
      "id":1234,
      "count":1,
      "product_id":20,
      "is_default":true,
      "address_id":null,
      "cart_order":{
        "cart_id":934,
        "order_id":1234
      },
      "product":{
        "id":20,
        "name":"General Tso Chicken",
        "price":10,
        "short_description":"Served with Rice or Egg Noodles",
        "description":"White meat chicken, lightly battered in a sweet & spicy sauce with broccoli.",
        "img":"bdae752d89571aa14a45d95a069eb816.jpg",
        "sorting":5,
        "cook_time":2,
        "category_id":1,
        "badge_id":2,
        "type":"product"
      },
      "order_modifiers":[
      
      ]
    }
  ],
    "status":null
};

export const order = {
  orderNormal: {
    "type": "order",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": null,
    "max_discount_products": null,
    "status": true
  },
  orderExpired: {
    "type": "order",
    "max_number_of_usages": null,
    "expire_date": "2016-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": null,
    "max_discount_products": null,
    "status": true
  },
  orderInactive: {
    "type": "order",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": null,
    "max_discount_products": null,
    "status": false
  },
  orderLimit: {
    "type": "order",
    "max_number_of_usages": 0,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": null,
    "max_discount_products": null,
    "status": true
  },
  orderSum: {
    "type": "order",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": 777,
    "bundle_main_id": null,
    "discount_product_id": null,
    "max_discount_products": null,
    "status": true
  }
};

export const single = {
  orderNormal: {
    "type": "single_product",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderExpired: {
    "type": "single_product",
    "max_number_of_usages": null,
    "expire_date": "2016-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderInactive: {
    "type": "single_product",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": false
  },
  orderLimit: {
    "type": "single_product",
    "max_number_of_usages": 0,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderSum: {
    "type": "single_product",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": 777,
    "bundle_main_id": null,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderProductId: {
    "type": "single_product",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": null,
    "discount_product_id": 777,
    "max_discount_products": null,
    "status": true
  }
};

export const bundle = {
  orderNormal: {
    "type": "bundle",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": 54,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderExpired: {
    "type": "bundle",
    "max_number_of_usages": null,
    "expire_date": "2016-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": 54,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderInactive: {
    "type": "bundle",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": 54,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": false
  },
  orderLimit: {
    "type": "bundle",
    "max_number_of_usages": 0,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": 54,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderSum: {
    "type": "bundle",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": 777,
    "bundle_main_id": 54,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  orderProductId: {
    "type": "bundle",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": 54,
    "discount_product_id": 777,
    "max_discount_products": null,
    "status": true
  },
  orderBundleMainId: {
    "type": "bundle",
    "max_number_of_usages": null,
    "expire_date": "4000-01-24T21:59:59.000Z",
    "min_order_sum": null,
    "bundle_main_id": 777,
    "discount_product_id": 48,
    "max_discount_products": null,
    "status": true
  },
  
};