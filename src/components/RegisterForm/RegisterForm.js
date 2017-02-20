import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import registerValidation from './registerValidation';
import * as registerActions from 'redux/modules/register';
import Isvg from 'react-inlinesvg';
import styles from './RegisterForm.scss';
import InputElement from 'react-input-mask';

async function asyncValidate(data, dispatch, {isValidEmail, isValidPhone}) {
  const res = {};
  if (data.phone) {
    const _res = await isValidPhone(data);
    res.phone = !!_res ? 'This phone already exists.' : _res;
  }
  if (data.email) {
    const _res = await isValidEmail(data);
    res.email = !!_res ? 'This email already exists.' : _res;
  }
  return Promise.resolve(res);
}

@connect(() => ({}),
  dispatch => bindActionCreators(registerActions, dispatch)
)

@reduxForm({
  form: 'register',
  fields: ['id', 'email', 'phone', 'firstName', 'lastName', 'password'],
  validate: registerValidation,
  asyncValidate,
  asyncBlurFields: ['email', 'phone']
})

export default class RegisterForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    btnText: PropTypes.string,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {id, email, phone, firstName, lastName, password},
      handleSubmit, btnText
      } = this.props;
    const renderInput = (field, placeholder, showAsyncValidating = false, inputType = 'text') =>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          {inputType && inputType === 'password' &&
          <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>}
          <input type={inputType}
                 className={(field.error && field.touched ? styles.inputError : '')}
                 placeholder={placeholder}
                 id={field.name} {...field}
           />
          {field.error && field.touched && <div className={styles.errorText}>{field.error}</div>}
        </div>
      </div>;

    return (
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <input type="hidden" id={id.id} {...id}/>
          {renderInput(email, 'Email', true, 'text')}
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <InputElement
                mask="999-999-9999"
                maskChar="*"
                className={(phone.error && phone.touched ? styles.inputError : '')}
                id={phone.name} {...phone}
                showAsyncValidating={true}
                placeholder={'Enter phone number'}
              />
              {phone.error && phone.touched && <div className={styles.errorText}>{phone.error}</div>}
            </div>
           </div>
          {renderInput(firstName, 'First name')}
          {renderInput(lastName, 'Last name')}
          {renderInput(password, 'Enter password', false, 'password')}
          <div className={styles.formGroup}>
            <button className={styles.redBtn} onClick={handleSubmit}>{!!btnText ? btnText : 'SIGN UP'}</button>
          </div>
        </form>
    );
  }
}
