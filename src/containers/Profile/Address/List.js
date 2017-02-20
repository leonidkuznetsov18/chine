import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Header, ViewAddress } from 'components';
import { load as loadAuth } from 'redux/modules/auth';
import { setDefault } from 'redux/modules/address';
import { push } from 'react-router-redux';
import styles from './Address.scss';
import _ from 'lodash';
import { cartLoad, togglePickupOption } from 'redux/modules/cart';

@connect(
  (state) => ({
    user: state.auth.user,
  }),
  {loadAuth, cartLoad, togglePickupOption, setDefault, pushState: push})
export default class List extends Component {

  static propTypes = {
    user: PropTypes.object,
    loadAuth: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    setDefault: PropTypes.func,
    cartLoad: PropTypes.func,
    togglePickupOption: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      changeAddress: false
    };
  }

  componentWillMount() {
    const { user, loadAuth } = this.props;
    loadAuth(user.token);
  }

  componentDidMount() {
    if (location.search === '?change-address') {
      this.setState({
        changeAddress: true
      });
    }
  }

  _addressFormat(address) {
    const { building, street, city } = address;

    let _address = '';

    if (building) {
      _address = `${building} ${street}, ${city}`;
    } else {
      _address = `${street}, ${city}`;
    }
    return _address;
  }

  handleClickBack() {
    const change = location.search;
    const { user, cartLoad, togglePickupOption, pushState } = this.props;
    if (change === '?change-address') {
      cartLoad(user.id).then(cart => {
        if (cart.address.out_of_range) {
          togglePickupOption(cart.id, true).then(() => {pushState('/cart');});
        } else {
          pushState('/cart');
        }
      });
    } else {
      this.props.pushState('/');
    }
  }

  handleSetState(addressId) {
    const { user, setDefault, loadAuth } = this.props;
    const addr = _.find(user.addresses, {id: addressId, is_default: true});
    if (!addr) {
      setDefault(user.id, addressId).then(() => {
        loadAuth(user.token);
      });
    }
  }

  handleRedirectToAddress() {
    const change = location.search;
    if (change === '?change-address') {
      this.props.pushState('/address?change-address');
    } else {
      this.props.pushState('/address');
    }
  }

  handleRedirectToCart() {
    const { user, cartLoad, togglePickupOption, pushState } = this.props;
    if (location.search === '?change-address') {
      cartLoad(user.id).then(cart => {
        if (cart.address.out_of_range) {
          togglePickupOption(cart.id, true).then(() => {pushState('/cart');});
        } else {
          pushState('/cart');
        }
      });
    }
  }

  render() {
    const { user } = this.props;

    const self = this;

    const renderItem = (addresses) =>
      <div className={styles.adressWrapItems}>
        {addresses.map((item, index) => {
          if (item.lat === 0 && item.lng === 0) {
            return null;
          }
          return (
            <ViewAddress
              outOfRange={item.out_of_range}
              key={index}
              pushState={this.props.pushState}
              isChecked={item.is_default}
              onChange={this.handleSetState.bind(self, item.id)}
              id={item.id}
              name={self._addressFormat(item)}/>
            );
        })}
      </div>;
    return (
      <div className={styles.addressProfile}>
        <Helmet title="Address Book"/>
        <Header buttonText={'Back'}
                pageCaption={<span>address book</span>}
                btnAction={this.handleClickBack.bind(this)}
        />
          <div className={styles.addressBook}>
            {user.addresses && renderItem(user.addresses)}
            <div className={styles.addressWrapButtons}>
              <button onClick={this.handleRedirectToAddress.bind(this)} className={styles.redBtn}>ADD ADDRESS</button>
              {this.state.changeAddress && <button onClick={this.handleRedirectToCart.bind(this)} className={styles.redBtn}>GO TO CART</button>}
            </div>
          </div>
       </div>
    );
  }
}
