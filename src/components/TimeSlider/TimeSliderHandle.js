import React from 'react';
import styles from './TimeSlider.scss';
import cx from 'classnames';

export default class TimeSliderHandle extends React.Component {
  static propTypes = {
    value: React.PropTypes.number,
    offset: React.PropTypes.number,
    marks: React.PropTypes.object,
  }

  render() {
    const { offset, value, marks } = this.props;
    const markASAP = Object.keys(marks).find(key => marks[key].enabled);
    const tooltipClass = cx(
      {'rc-slider-tooltip': true},
      {'tooltip-first': markASAP == value},
      {'tooltip-last': Object.keys(marks)[Object.keys(marks).length - 3] <= value});
    const tooltipArrowClass = cx(
      {'rc-slider-tooltip-arrow': true},
      {'tooltip-arrow-first': markASAP == value});
    return (
      <div className={styles.handleWrapper} style={{left: `${offset}%`}}>
        <div ref="tooltip" className={tooltipClass}>{marks[value].tooltip}</div>
        <div className="rc-slider-handle"/>
        <div className={tooltipArrowClass}/>
      </div>
    );
  }
}
