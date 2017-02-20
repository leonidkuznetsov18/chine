import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Header, Marker, AddressForm, Preloader, ModalInfo } from 'components';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import GoogleMap from 'google-map-react';
import { initialize } from 'redux-form';
import { addressAdd } from 'redux/modules/address';
import { register } from 'redux/modules/register';
import { addToCart, cartLoad, togglePickupOption } from 'redux/modules/cart';
import { login, load as loadAuth } from 'redux/modules/auth';
import config from '../../config';
import cookie from 'react-cookie';
import styles from './Address.scss';
import { setDefault } from 'redux/modules/address';
import axios from 'axios';

const stateData = {
  distance: config.distanceLimit + 1,
  suggestions: [],
  address: '',
  addressFull: {},
  defaultPosition: config.defaultPosition,
  position: null,
  showLoader: false
};

@connect(
  (state) => ({
    user: state.auth.user,
    history: state.history,
    cart: state.cart.item,
  }),
  { initialize, addressAdd, addToCart, togglePickupOption, cartLoad, setDefault, register, login, loadAuth, pushState: push })
export default class Address extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    addressAdd: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    cartLoad: PropTypes.func,
    addToCart: PropTypes.func,
    user: PropTypes.object,
    loadAuth: PropTypes.func,
    setDefault: PropTypes.func,
    cart: PropTypes.object,
    togglePickupOption: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      maps: null,
      map: null,
      ...stateData
    };
  }
  componentDidMount() {
    if (typeof (window) === 'undefined') {
      global.window = {};
    }
    this.setState({ mobileView: window.innerWidth <= 768 });
  }

  onHideModal = () => {
    this.setState({
      mobileView: false
    });
  };

  _setAddress(address) {
    this.setState({ address: address });
  }

  _setFullAddress(address) {
    let city;
    let street;
    let building;
    let zipCode;
    let country;
    let state;
    const addressComponents = address[0].address_components;
    Object.keys(addressComponents).map(item => {
      switch (true) {
        case (addressComponents[item].types.indexOf('street_number') !== -1):
          building = addressComponents[item].long_name;
          break;
        case (addressComponents[item].types.indexOf('route') !== -1):
          street = addressComponents[item].long_name;
          break;
        case (addressComponents[item].types.indexOf('locality') !== -1):
          city = addressComponents[item].long_name;
          break;
        case (addressComponents[item].types.indexOf('postal_code') !== -1):
          zipCode = addressComponents[item].short_name;
          break;
        case (addressComponents[item].types.indexOf('country') !== -1):
          country = addressComponents[item].short_name;
          break;
        case (addressComponents[item].types.indexOf('administrative_area_level_1') !== -1):
          state = addressComponents[item].short_name;
          break;
      }
      this.setState({ addressFull: { city: city, street: street, building: building, zip_code: zipCode, state: state, country: country } });
    });
  }

  _setSuggestions(suggestions) {
    this.setState({ suggestions: suggestions });
  }

  _setPosition(position) {
    this.setState({ position: position });
  }

  _calculateDistance() {
    const { maps, position, defaultPosition } = this.state;
    const service = new maps.DistanceMatrixService;
    const self = this;
    service.getDistanceMatrix({
      origins: [defaultPosition],
      destinations: [position],
      travelMode: maps.TravelMode.DRIVING,
      unitSystem: maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, (response) => {
      if (response.rows[0].elements[0].status === 'OK') {
        self.setState({ distance: response.rows[0].elements[0].distance.value });
      } else {
        self.setState({ distance: config.distanceLimit + 1 });
      }
    });
  }

  _composeSuggestions(predictions) {
    this._setSuggestions(predictions);
  }

  _changeAddress(address) {
    const { maps, defaultPosition } = this.state;
    this._setAddress(address);
    if (!this.autocomplete) {
      this.autocomplete = new maps.places.AutocompleteService();
    }
    if (!this.LatLng) {
      this.LatLng = new maps.LatLng(defaultPosition);
    }
    if (address) {
      this.autocomplete.getPlacePredictions({ input: address, types: ['geocode'], location: this.LatLng, radius: 5000 }, this._composeSuggestions.bind(this));
    } else {
      this._setSuggestions([]);
      this._setPosition(null);
    }
  }

  _setGeoLocate(request) {
    const { maps, map } = this.state;
    const geocoder = new maps.Geocoder;
    const self = this;
    geocoder.geocode(request, (results, status) => {
      if (status === maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        self._setAddress(results[0].formatted_address);
        self._setFullAddress(results);
        self._setPosition({ lat: lat, lng: lng });
        self._calculateDistance();
        self._setSuggestions([]);
        map.center = results[0].geometry.location;
      }
    });
    this.setState({
      showLoader: false
    });
  }

  handleLocate() {
    if (navigator.geolocation) {
      this.setState({
        showLoader: true
      }, () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const {latitude, longitude} = position.coords;
          const latLng = { lat: latitude, lng: longitude };
          this._setGeoLocate({ 'location': latLng });
        });
      });
    }
  }

  handleClickBack() {
    let state = '/';
    if (location.search === '?add-address') state = '/profile/address/list';
    if (location.search === '?change-address') state = '/cart';
    this.props.pushState(state);
  }

  handleChangeAddress(event) {
    this._setPosition(null);
    this._changeAddress(event.target.value);
  }

  handleChangeAddressDone() {
    this.handleSelectSuggestion(this.state.address);
  }

  handleSelectSuggestion(address) {
    this._setGeoLocate({ 'address': address });
  }
  _userToCookieAndRedirect(user) {
    cookie.save('user', user.token);
    if (location.search && location.search !== '?change-address') {
      const modifierId = location.search.replace('?', '');
      this.props.pushState('modify/product/' + modifierId);
    } else {
      browserHistory.goBack();
    }
  }

  _addToCart(user) {
    const { addToCart, cartLoad } = this.props;
    const productId = global.window.sessionStorage.getItem('preorder');
    if (productId) {
      return addToCart(user.id, productId).then(() => {
        global.window.sessionStorage.removeItem('preorder');
        return cartLoad(user.id);
      });
    }
    return cartLoad(user.id);
  }

  handleSubmit(data) {
    const { aptFloorSuite, company, notes, email, out_of_range } = data;
    const { user, addressAdd, loadAuth, register, login, setDefault, togglePickupOption, cartLoad} = this.props;
    const {building, city, street, zip_code, state, country} = this.state.addressFull;
    const formattedData = {
      apt_floor: aptFloorSuite,
      company: company,
      notes: notes,
      zip_code: zip_code,
      city: city,
      street: street,
      building: building,
      email: email,
      out_of_range: out_of_range,
      distance: this.state.distance,
      ...this.state.position,
      state: state,
      country: country
    };
    if (user) {
      formattedData.user_id = user.id;
      addressAdd(formattedData).then((address) => {
        loadAuth(user.token).then(() => {
          this._addToCart(user).then(() => {
            if (location.search === '?change-address') {
              setDefault(user.id, address.id).then(() => {
                cartLoad(user.id).then((cart) => {
                  if (cart.address.out_of_range) {
                    togglePickupOption(cart.id, true).then(() => {
                      this._userToCookieAndRedirect(user);
                    });
                  } else {
                    this._userToCookieAndRedirect(user);
                  }
                });
              });
            } else {
              this._userToCookieAndRedirect(user);
            }
          });
        });
      });
    } else {
      axios.post('/api/user/checkEmail', {email: email}).then(
        response => {
          if (!response.data) {
            register({ isActive: false }).then((newUser) => {
              formattedData.user_id = newUser.id;
              addressAdd(formattedData).then(() => {
                login(newUser.email, 'newPassword').then((_user) => {
                  this._addToCart(_user).then(() => {
                    this._userToCookieAndRedirect(_user);
                  });
                });
              });
            });
          } else {
            this.props.pushState('/login?email=' + email);
          }
        }
      );
    }
  }

  handleGoToAddress() {
    this.props.pushState('/login');
  }

  clearInput() {
    this.setState(stateData);
  }

  render() {
    const { user } = this.props;
    const { suggestions, position, defaultPosition, distance, address, showLoader } = this.state;
    const renderSuggestions = (items) =>
      <ul>
        {items && items.filter(item => item.types[0] === 'street_address').map((item, index) => {
          return <li key={index} onClick={this.handleSelectSuggestion.bind(this, item.description) }>{item.description}</li>;
        }) }
      </ul>;
    return (
      <div className={styles.address}>
        {
          showLoader &&
          <Preloader />
        }
        <Helmet title="Your Address"/>
        <Header buttonText={'Back'}
          pageCaption={<span>Your Address</span>}
          btnAction={this.handleClickBack.bind(this) }
          />
          <div className={styles.googleMapWrapper}>
            <GoogleMap
              defaultCenter={defaultPosition}
              center={position}
              defaultZoom={14}
              bootstrapURLKeys={{
                key: config.GOOGLE_MAPS_API_KEY,
                language: 'en',
                libraries: 'places',
              }}
              onGoogleApiLoaded={({map, maps}) => this.setState({ maps: maps, map: map }) }
              yesIWantToUseGoogleMapApiInternals={true}
              >
              {position !== null && <Marker lat={position.lat} lng={position.lng}/>}
            </GoogleMap>
          </div>
          <div className={styles.suggestionsWrapper}>
            {this.state.address.length != 0 &&
            <div className={styles.clearAddressInput}>
              <div className={styles.clearAddressBtn} onClick={this.clearInput.bind(this)}></div>
            </div>}
            <AddressForm
              ref="addressForm"
              showForm={position !== null && distance <= config.distanceLimit}
              showError={position !== null && distance > config.distanceLimit}
              showLocateMe={position === null}
              onCheckAddress={this.handleChangeAddressDone.bind(this) }
              onSubmit={position !== null ? distance <= config.distanceLimit ? data => this.handleSubmit({...data, out_of_range: false}) : data => this.handleSubmit({...data, out_of_range: true}) : this.handleLocate.bind(this) }
              onChangeAddress={this.handleChangeAddress.bind(this) }
              addressValue={address}
              initialValues={{email: user && user.is_active ? user.email : ''}}
              suggestions={renderSuggestions(suggestions) }
              onOrderCarryOut={() => this.handleSubmit({out_of_range: true, is_default: false})}
              showOrderCarryOut={user ? !user.addresses.length : true}
              >
              {(!user || !user.is_active) &&
                <p className={styles.signInWrapper}>
                  <a onClick={this.handleGoToAddress.bind(this) }>I have an account - sign in</a>
                </p>}
            </AddressForm>
          </div>
          <ModalInfo
             onShow={this.onShowModal}
             onHide={this.onHideModal}
             type="extra"
             showModal={this.state.mobileView}
             modalBoldTitle="To allow GPS location, please enable it on your device"
             modalRedBtn="Ok"
             onClickModalRedBtn={this.onHideModal}
           />
        </div>
    );
  }
}
