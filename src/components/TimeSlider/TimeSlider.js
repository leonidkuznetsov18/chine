import React, { Component, PropTypes} from 'react';
import Rcslider from 'rc-slider';
import styles from './TimeSlider.scss';
import TimeSliderHandle from './TimeSliderHandle';
import equal from 'deep-equal';

export default class TimeSlider extends Component {

  static propTypes = {
    changeSlider: PropTypes.func.isRequired,
    asapTime: PropTypes.number,
    setTime: PropTypes.func,
    savedTime: PropTypes.number,
    marks: PropTypes.number
  }

  /**
   * Because of fucking npm, value of slider shouldn't be controlled
   * by itself. We need to provide `value` prop to slider and manually
   * control every slider change to prevent selecting wrong time.
   * I submitted PR to extend slider with minValue and maxValue props.
   * (https://github.com/react-component/slider/pull/172). When author
   * will accept it - let rc-slider to control value and remove controls
   * from this wrapper.
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      marks: props.marks,
    };
  }

  componentDidMount() {
    const { savedTime } = this.props;
    const minValue = savedTime && savedTime >= this._getMinValue() ? savedTime : this._getMinValue();
    this.setState({
      value: minValue
    }, () => {
      this.props.changeSlider(this.state.marks[minValue].value, minValue == this._getMinValue());
    });
  }

  componentWillReceiveProps(np) {
    const { savedTime } = np;
    const currentMinValue = this._getMinValue();
    const minValue = savedTime && savedTime >= this._getMinValue() ? savedTime : this._getMinValue();
    this.setState({
      value: minValue
    });
    if (!equal(np.marks, this.state.marks)) {
      this.setState({
        marks: np.marks
      }, () => {
        this.setState({
          value: currentMinValue
        });
        this._onSliderUpdate(currentMinValue);
      });
    }
  }

  _onSliderChange = val => {
    if (!this.state.marks[val].enabled) {
      return;
    }
    this.props.setTime(val);
    this.setState({ value: val });
  };

  _onSliderUpdate = val => {
    this.props.changeSlider(
      this.state.marks[val].value,
      val == this._getMinValue()
    );
  };

  _getMinValue = () => {
    const { marks } = this.state;
    return Object.keys(marks).find(i => marks[i].enabled);
  };

  render() {
    const { marks, value } = this.state;
    const leftOffset = this.refs.slider ? -(this.refs.slider.refs.slider.offsetLeft + 1) : 26;
    const bgWidth = `${(100 * this._getMinValue() / Object.keys(marks).length) - 1}%`;
    return (
      <div className={styles.timeSlider}>
        <Rcslider
          ref="slider"
          min={0}
          max={Object.keys(marks).length - 1}
          value={Number(value)}
          dots={false}
          step={1}
          marks={marks}
          handle={<TimeSliderHandle marks={marks}/>}
          tipFormatter={null}
          onChange={val => this._onSliderChange(val)}
          onAfterChange={val => this._onSliderUpdate(val)}
        />
        <div className={styles.inactiveBackground} style={{width: `calc(${bgWidth} + ${leftOffset * 1.5}px)`, left: `-${leftOffset}`}} />
      </div>
    );
  }
}
