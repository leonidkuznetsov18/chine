import React, { Component, PropTypes} from 'react';
import styles from './AddressLine.scss';

export default class AddressLine extends Component {
  static propTypes = {
    address: PropTypes.object,
    redirectAddress: PropTypes.func,
  }

  _addressFormat() {
    const { building, street, city } = this.props.address;

    let _address = '';

    if (building) {
      _address = `${building} ${street}, ${city}`;
    } else {
      _address = `${street}, ${city}`;
    }
    return _address;
  }

  render() {
    return (
      <div className={styles.addressLine} onClick={this.props.redirectAddress}>
        <span className={styles.addressText}>{this._addressFormat()}</span>
      </div>
    );
  }
}
