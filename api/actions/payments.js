import config from '../config'

const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const constants = require('authorizenet').Constants;

export function voidTransaction(transactionId) {
  return new Promise((resolve, reject) => {

    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(config.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(config.TRANSACTION_KEY);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.VOIDTRANSACTION);
    transactionRequestType.setRefTransId(transactionId);

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preproduction')
      ctrl.setEnvironment(constants.endpoint.production);

    ctrl.execute((resp) => {
      var apiResponse = ctrl.getResponse();

      var response = new ApiContracts.CreateTransactionResponse(apiResponse);
      if (response != null) {
        if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
          if(response.getTransactionResponse().getMessages() != null){
            resolve({'transaction_id': response.getTransactionResponse().getTransId()});
            console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
            console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
            console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
          }
          else {
            console.log('Failed Transaction.');
            if(response.getTransactionResponse().getErrors() != null){
              reject({
                'error_message': response.getMessages().getMessage()[0].getText(),
                'Error Code': response.getMessages().getMessage()[0].getCode()});
            }
          }
        }
        else {
          console.log('Failed Transaction. ');
          if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
            console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
            console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
            reject({
              'Error Code': response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
              'error_message': response.getTransactionResponse().getErrors().getError()[0].getErrorText()});
          }
          else {
            console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
            console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
            reject({
              'Error Code': response.getMessages().getMessage()[0].getText(),
              'error_message': response.getMessages().getMessage()[0].getCode()});
          }
        }
      }
      else{
        console.log('Null Response.');
        reject({});
      }
    })
  })
}

export function refund(data) {
  return new Promise((resolve, reject) => {

    const { card_no, exp_date, amount, transaction_id } = data;

    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(config.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(config.TRANSACTION_KEY);

    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(card_no);
    creditCard.setExpirationDate(exp_date);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.REFUNDTRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);
    transactionRequestType.setRefTransId(transaction_id);

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preproduction')
      ctrl.setEnvironment(constants.endpoint.production);

    ctrl.execute((resp) => {
      var apiResponse = ctrl.getResponse();

      var response = new ApiContracts.CreateTransactionResponse(apiResponse);
      if (response != null) {
        if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK &&
          response.getTransactionResponse().getResponseCode() == '1'){
            resolve({'transaction_id': response.getTransactionResponse().getTransId()});
          }
        else {
          console.log('Result Code: ' + response.getMessages().getResultCode());
          console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
          console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
          reject({
            'error_message': response.getMessages().getMessage()[0].getText(),
            'Error Code': response.getMessages().getMessage()[0].getCode()});
        }
      }
      else{
        console.log('Null Response.');
        reject({});
      }
    })
  })
}

export default function payProcess(data) {
  return new Promise((resolve, reject) => {

    const { card_no, exp_date, cvc, amount } = data;

    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(config.API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(config.TRANSACTION_KEY);

    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(card_no);
    creditCard.setExpirationDate(exp_date);
    creditCard.setCardCode(cvc);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preproduction')
      ctrl.setEnvironment(constants.endpoint.production);

    ctrl.execute((resp) => {
      var apiResponse = ctrl.getResponse();

      var response = new ApiContracts.CreateTransactionResponse(apiResponse);
      if (response != null) {
        if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK &&
          response.getTransactionResponse().getResponseCode() == '1'){
            resolve({'transaction_id': response.getTransactionResponse().getTransId()});
          }
        else {
          console.log('Result Code: ' + response.getMessages().getResultCode());
          console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
          console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
          reject({
            'error_message': response.getMessages().getMessage()[0].getText(),
            'Error Code': response.getMessages().getMessage()[0].getCode()});
        }
      }
      else{
        console.log('Null Response.');
        reject({});
      }
    })
  })
}
