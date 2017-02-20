import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './UserEditForm.scss';
import validation from './validation';
import InputElement from 'react-input-mask';
import * as registerActions from 'redux/modules/register';

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
  fields: ['id', 'email', 'phone', 'firstName', 'lastName'],
  validate: validation,
  asyncValidate,
  asyncBlurFields: ['email', 'phone']
})
export default class ProfileEditForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    btnText: PropTypes.string,
    valid: PropTypes.bool.isRequired,
  }

  render() {
    const {
      fields: {id, email, phone, firstName, lastName},
      handleSubmit
      } = this.props;


    const renderInput = (field, placeholder) =>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={(field.error && field.touched ? styles.inputError : '')}
            placeholder={placeholder}
            id={field.name} {...field}
           />
          {field.error && field.touched && <div className={styles.errorText}>{field.error}</div>}
        </div>
      </div>;

    return (
      <form className={styles.userEditForm} onSubmit={handleSubmit}>
        <input type="hidden" id={id.id} {...id}/>
        {renderInput(email, 'Email')}
        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <InputElement
              mask="999-999-9999"
              maskChar="*"
              className={(phone.error && phone.touched ? styles.inputError : '')}
              id={phone.name} {...phone}
              placeholder={'Enter phone number'}
            />
            {phone.error && phone.touched && <div className={styles.errorText}>{phone.error}</div>}
          </div>
        </div>
        {renderInput(firstName, 'First name')}
        {renderInput(lastName, 'Last name')}
        <button className={styles.redBtn}>SAVE</button>
      </form>
    );
  }
}
