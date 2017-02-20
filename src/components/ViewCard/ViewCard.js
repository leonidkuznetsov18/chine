import React, { Component, PropTypes} from 'react';
import styles from './ViewCard.scss';

export default class ViewCard extends Component {
  static propTypes = {
    isChecked: PropTypes.bool,
    name: PropTypes.node,
    id: PropTypes.number,
    handleRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
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
               <div className={styles.viewCardNumberCard}>
                   {this.props.name}
               </div>
               <div className={styles.viewCardWrapLink}>
                 <a onClick={this.props.handleRemove.bind(this, this.props.id)} className={styles.viewCardLink}>Delete</a>
               </div>
            </div>
        </div>
    );
  }
}
