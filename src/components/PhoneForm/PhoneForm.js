import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isValidPhone } from 'redux/modules/register';
import phoneValidation from './phoneValidation';
import styles from './PhoneForm.scss';
import InputElement from 'react-input-mask';

@connect(() => ({}),
  dispatch => bindActionCreators({isValidPhone}, dispatch)
)

@reduxForm({
  form: 'phoneForm',
  fields: ['phone', 'userId'],
  validate: phoneValidation,
})

export default class PhoneForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    children: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: ''
    };
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
  }

  render() {
    const {
      fields: { phone },
      handleSubmit
      } = this.props;

    return (
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <div className={styles.checkoutFormContainer}>
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
        </div>
        <div className={styles.checkoutWrapPayinfo}>
          {this.props.children}
          <button className={styles.checkoutBtn} onClick={handleSubmit}>Confirm</button>
        </div>
      </form>
    );
  }
}
