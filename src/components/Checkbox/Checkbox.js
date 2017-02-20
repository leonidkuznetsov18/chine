import React, { Component, PropTypes} from 'react';
import styles from './Checkbox.scss';
import { connect } from 'react-redux';

@connect(
  (state) => ({
    user: state.auth.user
  }),
  {})
export default class Checkbox extends Component {
  static propTypes = {
    field: PropTypes.object,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  handleChangeState() {
    this.setProps({field: !this.props.field});
  }

  render() {
    const { field, user } = this.props;
    return (
      <div className={styles.checkbox}>
        <input type="checkbox" onChange={this.handleChangeState.bind(this)} {...this.props.field} id="chB"/>
        {user && !user.is_active && <label htmlFor="chB">Save my card details for future orders{(field && field.value) && <p>(you will be redirected to the registation page after payment)</p>}</label>}
        {user && user.is_active && <label htmlFor="chB">Save my card details for future orders.</label>}
      </div>
    );
  }
}
