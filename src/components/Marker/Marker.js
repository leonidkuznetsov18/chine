import React, {Component} from 'react';
import Isvg from 'react-inlinesvg';
import styles from './Marker.scss';

export default class Marker extends Component {
  render() {
    return (
      <Isvg src={'/uploads/location-pin.svg'} className={styles.marker}/>
    );
  }
}
