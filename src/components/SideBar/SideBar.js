import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from './SideBar.scss';
import { Header, ModalInfo } from 'components';
import { toggleSidebar } from 'redux/modules/sidebar';
import { push } from 'react-router-redux';
import cookie from 'react-cookie';
import { logout } from 'redux/modules/auth';
import { clean as cleanCart} from 'redux/modules/cart';
import Isvg from 'react-inlinesvg';
import logo from './logo.svg';
import { update as userUpdate, load as loadAuth } from 'redux/modules/auth';
//  import cx from 'classnames';

@connect(
  state => ({ isOpen: state.sidebar.isOpen, user: state.auth.user }),
  { pushState: push, toggleSidebar, logout, cleanCart, userUpdate, loadAuth }
)

export default class SideBar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    actions: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    isUser: PropTypes.bool,
    userUpdate: PropTypes.func,
    loadAuth: PropTypes.func,
    toggleSidebar: PropTypes.func,
    logout: PropTypes.func.isRequired,
    cleanCart: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      user: cookie.load('user'),
      showModal: false
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'visible';
  }

  onShowModal = () => {
    this.setState({
      showModal: true
    });
  }

  onHideModal = () => {
    this.setState({
      showModal: false
    });
  }

  onClick = (href) => {
    this.setState({
      showModal: false
    }, () => {
      this.props.pushState(href);
      // dirty solution for transitions from this sidebar.
      // but it's need much time to investigate problems
      // with removing sidebar from entire site.
      setTimeout(this.props.toggleSidebar, 200);
    });
  }

  handleMenuClick() {
    this.props.toggleSidebar(false);
  }

  handleLogOut() {
    const { logout, toggleSidebar, cleanCart } = this.props;
    logout();
    cleanCart();
    toggleSidebar();
    cookie.remove('user', { path: '/' });
  }

  handleChangeTheme(flag) {
    const { user, userUpdate, loadAuth } = this.props;
    userUpdate(user.id, { is_catering: flag }).then((user) => {
      loadAuth(user.token).then(() => {
        this.props.toggleSidebar(false);
      });
    });
  }

  render() {
    if (!this.props.isOpen) return false;
    const { user } = this.props;
    return (
      <div className={styles.sideBarContainer}>
        <Header isRed={true} buttonType={'menuOpen'}
          pageCaption={user && user.is_active && <span>tso chinese delivery</span>}
          btnAction={this.handleMenuClick.bind(this) }
          />

          {this.props.isUser && <div className={styles.pageList}>
            <ul className={styles.sidebarList}>
              <li className={styles.sidebarListItem}>
                <a className={styles.sidebarListLink} onClick={() => this.onClick('/profile/user/edit')}>profile</a>
              </li>
              <li className={styles.sidebarListItem}>
                <a className={styles.sidebarListLink} onClick={() => this.onClick('/profile/address/list')}>address book</a>
              </li>
              <li className={styles.sidebarListItem}>
                <a className={styles.sidebarListLink} onClick={() => this.onClick('/profile/card/list')}>payments</a>
              </li>
              <li className={styles.sidebarListItem}>
                <a className={styles.sidebarListLink} onClick={() => this.onClick('/order-history')}>order history</a>
              </li>
              <li className={styles.sidebarListItem}>
                <a className={styles.sidebarListLink} href="#" onClick={this.onShowModal}>help</a>
              </li>
              {
                /* <li className={styles.sidebarListItem}>
                <a className={styles.sidebarListLinkInd} href='#' onClick={this.handleChangeTheme.bind(this, false) }>Individuals</a>
              </li>
              <li className={cx({
                [styles.doubleLink]: true,
                [styles.sidebarListItem]: true
              }) }>
              <a className={styles.sidebarListLinkCatering} onClick={this.handleChangeTheme.bind(this, true) } href='#'>Catering</a>
                <a onClick={() => this.onClick('/static-page/about-catering')} className={styles.linkMore}>Learn more</a>
              </li> */
              }
            </ul>
            <button className={styles.buttonRed} onClick={this.handleLogOut.bind(this) }>sign out</button>
          </div>}
          {!this.props.isUser &&
            <div className={styles.signHeaderWrap}>
              <Isvg src={logo} className={styles.signHeaderLogo}/>
              <div className={styles.signHeaderWrapButtons}>
                <button className={styles.whiteBtn} onClick={() => this.onClick('/register')}>REGISTRATION</button>
                <button className={styles.redBtn} onClick={() => this.onClick('/login')}>SIGN IN</button>
              </div>
            </div>
          }

        {this.state.showModal &&
          <ModalInfo
            onShow={this.onShowModal}
            onHide={this.onHideModal}
            showModal={this.state.showModal}
            onClickModalBtn={this.onHideModal}
            modalInfoBtnOkName={'Close'}
            modalHeaderText={'Sorry!'}
            modalInfoText={'This page is under development!'}
          />
        }
      </div>
    );
  }
}
