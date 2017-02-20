import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isValidPhone } from 'redux/modules/register';
import checkoutValidation from './checkoutValidation';
import {Checkbox} from 'components';
import cx from 'classnames';
import Isvg from 'react-inlinesvg';
import styles from './CheckoutForm.scss';
import InputElement from 'react-input-mask';

@connect(() => ({}),
  dispatch => bindActionCreators({isValidPhone}, dispatch)
)

@reduxForm({
  form: 'checkout',
  fields: ['cardNumber', 'expDate', 'cvc', 'phone', 'isSave', 'userId'],
  validate: checkoutValidation
})

export default class CheckoutForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    children: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'redux-form/CHANGE',
      field: 'cardNumber',
      form: 'checkout',
      value: ''
    });
  }

  onCardNumberChange(e) {
    const {value} = e.target;
    if (!/^\d+$/.test(value) && value !== '') {
      e.preventDefault();
    } else {
      this.props.dispatch({
        type: 'redux-form/CHANGE',
        field: 'cardNumber',
        touch: false,
        form: 'checkout',
        value: value
      });
    }
  }

  _renderErrors = () => {
    const { fields } = this.props;
    const errors = [];
    for (const key in fields) {
      if (fields[key].invalid && fields[key].touched) {
        if (fields[key].name !== 'phone') {
          errors.push(<div className={styles.inputErrorText}>{fields[key].error}</div>);
        }
      }
    }
    return errors;
  };

  render() {
    const {
      fields: {cardNumber, expDate, cvc, phone, isSave, userId},
      handleSubmit
      } = this.props;
    const renderInput = (field, placeholder, name = '', mask = '', showAsyncValidating = false, inputType = 'text' ) =>
      <div className={styles.checkoutGroup}>
        {inputType && (inputType === 'password') &&
          <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
        }
        {
          field.name === 'cardNumber' ?
            <input
              type={inputType}
              className={cx({
                [styles.checkoutInput]: true,
                [styles.inputError]: field.error && field.touched
              })}
              name={name}
              maxLength="16"
              placeholder={placeholder}
              id={field.name} {...field}
              onChange={this.onCardNumberChange.bind(this)}
            /> :
            <InputElement
              type={inputType}
              className={cx({
                [styles.checkoutInput]: true,
                [styles.inputError]: field.error && field.touched
              })}
              name={name}
              mask={mask}
              placeholder={placeholder}
              id={field.name} {...field}
              maskChar="*"
            />
        }
    </div>;

    return (
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <div className={styles.checkoutFormContainer}>
          <div className={styles.checkoutBlockForm}>
            {renderInput(cardNumber, 'Card Number', 'cardNumber', '9999 9999 9999 9999')}
            <div className={styles.checkoutDoubleGroup}>
              {renderInput(expDate, 'MM/YY', 'expDate', '99/99')}
              {renderInput(cvc, 'CVC/CVV', 'cvc', '999', false, 'password')}
            </div>
          </div>
          <div className={styles.errorWrap}>
            {this._renderErrors()}
          </div>
          <div className={styles.checkoutCheckbox}>
            <Checkbox field={isSave}/>
          </div>
          <div className={styles.checkoutBlockForm}>
            {renderInput(phone, 'Enter phone number', 'phoneNumber', '999-999-9999', true)}
            <input type="hidden" {...userId}/>
          </div>
            {phone.invalid && phone.touched &&
             <div className={styles.inputErrorText}>{phone.error}</div>
            }
        </div>
        <div className={styles.checkoutWrapPayinfo}>
          {this.props.children}
          <button className={styles.checkoutBtn} onClick={handleSubmit}>PAY</button>
        </div>
      </form>
    );
  }
}
