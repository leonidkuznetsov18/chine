import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addressValidation from './addressValidation';
import * as addressActions from 'redux/modules/address';
import cx from 'classnames';
import Isvg from 'react-inlinesvg';
import iconLocate from './location-arrow.svg';
import styles from './AddressForm.scss';

@connect(() => ({}),
   dispatch => bindActionCreators(addressActions, dispatch)
)

@reduxForm({
  form: 'address',
  fields: ['email', 'address', 'company', 'aptFloorSuite', 'notes'],
  validate: addressValidation
})

export default class AddressForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    suggestions: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    showError: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    onChangeAddress: PropTypes.func.isRequired,
    onCheckAddress: PropTypes.func.isRequired,
    addressValue: PropTypes.string,
    showLocateMe: PropTypes.bool,
    showOrderCarryOut: PropTypes.bool,
    onOrderCarryOut: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ])
  }

  render() {
    const {
      fields: {email, company, aptFloorSuite, notes},
      showForm, handleSubmit, onChangeAddress, addressValue, showError, suggestions, showLocateMe
    } = this.props;
    const inputAddressClass = cx({
      [styles.autocompleteInput]: true,
      [styles.autocompleteInputActive]: showForm
    });
    const renderInput = (field, placeholder, inputType = 'text') =>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          {inputType && inputType === 'password' &&
            <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>}
            <input type={inputType}
                  className={(field.error && field.touched ? styles.inputError : '')}
                  placeholder={placeholder} id={field.name} {...field}
            />
          {field.error && field.touched && <div className={styles.errorText}>{field.error}</div>}
        </div>
      </div>;
    const renderTextArea = (field, placeholder) =>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <textarea className={(field.error && field.touched ? styles.inputError : '')}
                    placeholder={placeholder} id={field.name} {...field}/>
          {field.error && field.touched && <div className={styles.errorText}>{field.error}</div>}
        </div>
      </div>;

    return (
        <form className={styles.addressForm}>
          <div className={styles.autocompleteWrapper}>
            <input type="text"
                  ref="address"
                  placeholder="ENTER YOUR ADDRESS"
                  onChange={onChangeAddress}
                  value={addressValue}
                  className={inputAddressClass}/>
          </div>
          <div className={styles.addressFormCart}>
            {suggestions}
            <div className={styles.formDivider}/>
            {showForm && <div className={styles.formWrapper}>
            {renderInput(company, 'Company (optional)', true)}
            {renderInput(aptFloorSuite, 'Apt/Floor/Suite')}
            {renderTextArea(notes, 'Delivery Instructions')}
            </div>}
              <div className={styles.wrapBottomControl}>
                {showError &&
              <div className={styles.formWrapper}>
                <p>We’re not delivering to your area quite yet. Enter your email to order carryout.</p>
                {renderInput(email, 'Email', true)}
              </div>}
                <button type="button"
                        className={styles.redBtn}
                        onClick={handleSubmit}>
                  {showLocateMe ? 'LOCATE ME' : 'SAVE'}
                  {showLocateMe ? <Isvg src={iconLocate} className={styles.iconLocate}/> : null}
                </button>
                <br />
                {
                  this.props.showOrderCarryOut &&
                  <button
                    type="button"
                    className={styles.redBtn}
                    onClick={this.props.onOrderCarryOut}
                  >
                    Order Carryout Instead
                  </button>
                }
                {this.props.children}
              </div>
          </div>
        </form>
    );
  }
}
