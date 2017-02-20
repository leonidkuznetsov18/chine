import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import cardAddFormValidation from './cardAddFormValidation';
import Isvg from 'react-inlinesvg';
import styles from './CardAddForm.scss';
import InputElement from 'react-input-mask';

@reduxForm({
  form: 'cardAdd',
  fields: ['cardNumber', 'expDate', 'cvc'],
  validate: cardAddFormValidation
})

export default class CardAddForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    btnText: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    dispatch: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      expDate: '',
      cvс: ''
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'redux-form/CHANGE',
      field: 'cardNumber',
      form: 'cardAdd',
      value: ''
    });
  }

  onCardNumberChange(e) {
    const {value} = e.target;
    if (!/^\d+$/.test(value) && value !== '' || value.length > 16) {
      e.preventDefault();
    } else {
      this.props.dispatch({
        type: 'redux-form/CHANGE',
        field: 'cardNumber',
        touch: false,
        form: 'cardAdd',
        value: value
      });
    }
  }

  render() {
    const {
      fields: {cardNumber, expDate, cvc},
      handleSubmit, btnText
      } = this.props;
    const renderInput = (field, placeholder, name = '', mask = '', inputType = 'text') =>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          {inputType && (inputType === 'cardNumberInput') &&
            <Isvg src={'/uploads/card.svg'} className={styles.icon}/>
          }
          {inputType && (inputType === 'password') &&
            <Isvg src={'/uploads/question.svg'} className={styles.icon}/>
          }
          {
            field.name === 'cardNumber' ?
            <input
              type={inputType}
              className={(field.error && field.touched ? styles.inputError : '')}
              name={name}
              placeholder={placeholder}
              id={field.name} {...field}
              onChange={this.onCardNumberChange.bind(this)}
            /> :
          <InputElement
            type={inputType}
            className={(field.error && field.touched ? styles.inputError : '')}
            name={name}
            mask={mask}
            placeholder={placeholder}
            id={field.name} {...field}
            maskChar="*"
          />
      }
          {field.error && field.touched && <div className={styles.errorText}>{field.error}</div>}
        </div>
      </div>;
    return (
        <form className={styles.cardAddForm}>
         {renderInput(cardNumber, 'Enter Card Number', 'cardNumber', '9999 9999 9999 9999', 'cardNumberInput')}
         {renderInput(expDate, 'Expiration Date (mm/yy)', 'expDate', '99/99')}
         {renderInput(cvc, 'CVC/CVV Code', 'cvc', '999', 'password')}
         <button className={styles.redBtn} onClick={handleSubmit}>{!!btnText ? btnText : 'SAVE'}</button>
        </form>
    );
  }
}
