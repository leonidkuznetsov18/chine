import React, { Component, PropTypes} from 'react';
import cx from 'classnames';
import styles from './ModalInfo.scss';
import Isvg from 'react-inlinesvg';
import logo from './logo.svg';

export default class ModalInfo extends Component {

  static propTypes = {
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    onClickModalBtn: PropTypes.func.isRequired,
    onClickModalCancelBtn: PropTypes.func,
    modalInfoBtnOkName: PropTypes.string.isRequired,
    modalInfoBtnCancelName: PropTypes.string,
    modalInfoText: PropTypes.string.isRequired,
    modalHeaderText: PropTypes.string,
    showModal: PropTypes.bool,
    type: PropTypes.string,
    modalBoldTitle: PropTypes.string,
    modalNotification: PropTypes.string,
    modalRedBtn: PropTypes.string,
    onClickModalRedBtn: PropTypes.func,
    modalUnderlineBtn: PropTypes.string,
    onClickModalUnderlineBtn: PropTypes.func
  };

  static defaultProps = {
    onShow: function() {
      console.log('Create Function onShow');
    },
    onHide: function() {
      console.log('Create Function onHide');
    },
    onClickModalBtn: function() {
      console.log('Create Function onClickModalBtn');
    },
    modalInfoBtnOkName: 'ok',
    modalInfoText: 'Lorem ipsum dolor sit amet.',
    showModal: false
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].classList.add('bodyModalInfoOpen');
    global.window.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].classList.remove('bodyModalInfoOpen');
  }

  _renderExtraModal() {
    const modalInfoClass = cx({
      [styles.modalInfo]: true,
      [styles.modalInfoOpen]: this.props.showModal
    });
    return (
      <div className={modalInfoClass}>
        <div className={styles.modalInfoContainer}>
            <Isvg src={logo} className={styles.modalLogo}/>
            <span className={styles.modalInfoClose} onClick={this.props.onHide}></span>
           <div className={styles.modalInfoContainerWrapper}>
             {
               this.props.modalBoldTitle &&
               <div className={styles.modalBoldTitle}>
                 {this.props.modalBoldTitle}
               </div>
             }
             {
               this.props.modalNotification &&
               <div className={styles.modalNotification}>
                 {this.props.modalNotification}
               </div>
             }
             <div className={styles.modalContainerColumnButtons}>
               {this.props.modalRedBtn &&
               <button className={styles.redBtn} onClick={this.props.onClickModalRedBtn}>
                 {this.props.modalRedBtn}
               </button>}
               {this.props.modalUnderlineBtn &&
               <button
                 className={styles.underLineButton}
                 onClick={this.props.onClickModalUnderlineBtn}>
                 {this.props.modalUnderlineBtn}
               </button>}
             </div>
           </div>
        </div>
      </div>
    )
  }


  _renderDefaultModal() {
    const modalInfoClass = cx({
      [styles.modalInfo]: true,
      [styles.modalInfoOpen]: this.props.showModal
    });
    return (
      <div className={modalInfoClass}>
        <div className={styles.modalInfoContainer}>
          <div className={styles.modalHeaderText}>{this.props.modalHeaderText}</div>
          <span className={styles.modalInfoClose} onClick={this.props.onHide}></span>
           <div className={styles.modalInfoContainerWrapper}>
             <div className={styles.modalInfoText}>
               {this.props.modalInfoText}
             </div>
             <div className={styles.modalContainerButtons}>
               {this.props.modalInfoBtnOkName &&
               <button className={styles.redBtn} onClick={this.props.onClickModalBtn}>
                 {this.props.modalInfoBtnOkName}
               </button>}
               {this.props.modalInfoBtnCancelName &&
               <button className={styles.redBtn} onClick={this.props.onClickModalCancelBtn}>
                 {this.props.modalInfoBtnCancelName}
               </button>}
             </div>
           </div>
        </div>
      </div>
    )
  }

  _renderCustomModal(type) {
    switch(type) {
      case 'extra' :
        return (
          this._renderExtraModal()
        )
      default:
        return (
          this._renderDefaultModal()
        )
    }
  }

  render() {
    return this._renderCustomModal(this.props.type)
  }
}
