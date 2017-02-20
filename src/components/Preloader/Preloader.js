import React, { Component } from 'react';
import styles from './Preloader.scss';
import cx from 'classnames';

export default class Preloader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.words = ['T', 'S', 'O'];
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].classList.add('bodyPreloader');
    this.timerClass = setInterval(() => {
      if (this.state.activeIndex === (this.words.length - 1)) {
        this.setState({
          activeIndex: 0
        });
      } else {
        this.setState({
          activeIndex: ++this.state.activeIndex
        });
      }
    }, 500);
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].classList.remove('bodyPreloader');
    clearInterval(this.timerClass);
  }


  render() {
    return (
      <div className={styles.wrapperPreloader}>
        <div className={styles.preloader}>
          {
            this.words.map((word, idx) => {
              const preloaderItemClass = cx({
                [styles.preloaderItem]: true,
                [styles.preloaderAnimate]: this.state.activeIndex === idx
              });
              return (
                <div className={preloaderItemClass} key={idx}>
                  <div className={styles.preloaderItemFront}>
                    {word}
                  </div>
                  <div className={styles.preloaderItemBack}>
                    {word}
                  </div>
                </div>
                );
            })
          }
        </div>
      </div>
    );
  }
}
