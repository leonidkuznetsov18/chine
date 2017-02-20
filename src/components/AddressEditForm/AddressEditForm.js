import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addressValidation from './addressValidation';
import Isvg from 'react-inlinesvg';
import * as addressActions from 'redux/modules/address';
import styles from './AddressEditForm.scss';

@connect(() => ({}),
   dispatch => bindActionCreators(addressActions, dispatch)
)

@reduxForm({
  form: 'addressEdit',
  fields: ['address', 'address', 'company', 'aptFloorSuite', 'notes'],
  validate: addressValidation
})

export default class AddressForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    suggestions: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {address, company, aptFloorSuite, notes},
      handleSubmit, handleRemove
    } = this.props;

    const renderTextarea = (field, placeholder, isDisabled = false, icon = null) =>
      <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <textarea disabled={isDisabled}
                        className={(field.error && field.touched ? styles.inputError : '')}
                        placeholder={placeholder}
                        id={field.name} {...field}
                        rows={2}
              />
            </div>
          </div>;

    const renderInput = (field, placeholder, isDisabled = false, icon = null) =>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          {icon && icon}<input disabled={isDisabled}
                              className={(field.error && field.touched ? styles.inputError : '')}
                              placeholder={placeholder}
                              id={field.name} {...field}
          />
          {field.error && field.touched && <div className={styles.errorText}>{field.error}</div>}
        </div>
      </div>;

    return (
        <form className={styles.addressEditForm} onSubmit={handleSubmit}>
          {renderInput(address, 'Address', true, <Isvg src={'/uploads/location-pin.svg'} className={styles.formIconMarker}/>)}
          {renderInput(company, 'Company')}
          {renderInput(aptFloorSuite, 'Apt/Floor/Suite')}
          {renderTextarea(notes, 'Delivery instructions')}
          <div className={ styles.formGroup}>
            <button className={styles.redBtn} onClick={handleSubmit}>Save</button>
          </div>
          <div className={ styles.formGroup}>
            <button className={styles.transparentBtn} type="button" onClick={handleRemove}>remove address</button>
          </div>
        </form>
    );
  }
}
