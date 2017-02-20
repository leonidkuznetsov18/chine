import React, { Component, PropTypes} from 'react';
import styles from './TotalAmount.scss';

export default class TotalAmount extends Component {
  static propTypes = {
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.oneOf(['order', 'promo', 'total']),
  };
  render() {
    return (
      <div className={styles.totalAmount}>
        <div className={styles.borderTop}></div>
        <div className={styles.totalAmountText}>
          <span className={styles.blackText}>{this.props.type}</span>
          <br/>
          {this.props.type === 'total' && 'TAX&DELIVERY INCLUDED'}
          <br/>
          {this.props.type === 'total' && <span className={styles.blackText}>no gratuity required</span>}
        </div>
        <div className={styles.totalAmountPrice}>
          <span className={styles.blackText}>
            {this.props.type === 'promo' ? '-' : null}${this.props.amount}
          </span>
        </div>
      </div>
    );
  }
}
