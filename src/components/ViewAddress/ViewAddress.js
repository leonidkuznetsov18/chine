import React, { Component, PropTypes} from 'react';
import styles from './ViewAddress.scss';
import Isvg from 'react-inlinesvg';
import carryout from './carryout.svg';

export default class ViewAddress extends Component {
  static propTypes = {
    isChecked: PropTypes.bool,
    name: PropTypes.node,
    id: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    outOfRange: PropTypes.bool
  }

  render() {
    return (
        <div className={styles.viewCard}>
            <div className={styles.viewCardWrapper}>
               <div className={styles.viewCardCheckBox}>
                   <input type="radio"
                           name ="radio"
                           checked={this.props.isChecked}
                           onChange={this.props.onChange}
                           id={this.props.id}
                           className={styles.css_checkbox}
                   />
                   <label htmlFor={this.props.id} className={styles.css_label}></label>
               </div>
               <div className={styles.viewAddress}>
                 <span className={styles.viewAddressName}>{this.props.name}</span>
               {this.props.outOfRange &&
                  <div className={styles.carryout}>
                  <Isvg src={carryout} className={styles.carryoutIcon}/>
                  <span className={styles.viewCarryOut}> Outside Delivery Area - Carryout Only </span>
                </div>}
               </div>
               <div className={styles.viewCardWrapLink}>
                   <a onClick={() => this.props.pushState(`/profile/address/edit/${this.props.id}`)}
                      className={styles.viewCardLink}>
                    Edit
                  </a>
               </div>
            </div>
        </div>
    );
  }
}
