import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { Header, AddressEditForm, ModalInfo } from 'components';
import { load as loadAuth } from 'redux/modules/auth';
import styles from './Address.scss';
import { loadAddress, updateAddress, removeAddress } from 'redux/modules/address';


@connect(
  (state) => ({
    user: state.auth.user,
    address: state.address.item}),
  {loadAuth, loadAddress, updateAddress, removeAddress, pushState: push})
export default class Edit extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    loadAuth: PropTypes.func.isRequired,
    loadAddress: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired,
    removeAddress: PropTypes.func.isRequired,
    routeParams: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentWillMount() {
    const { loadAddress, routeParams: {addressId} } = this.props;
    loadAddress(addressId);
  }

  onHideModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleSubmitClick(data) {
    const { updateAddress, pushState, routeParams: {addressId} } = this.props;
    updateAddress(addressId, data).then(() => {
      pushState('/profile/address/list');
    });
  }

  handleRemoveClick() {
    const { user, loadAuth, removeAddress, pushState, routeParams: {addressId} } = this.props;
    removeAddress(addressId).then(() => {
      pushState('/profile/address/list');
    }).then(loadAuth(user.token));
  }

  handleRemoveAddressClick() {
    this.setState({showModal: true});
  }

  handleClickBack() {
    this.props.pushState('/profile/address/list');
  }

  _addressFormat() {
    const { building, street, city } = this.props.address;

    let _address = '';

    if (building) {
      _address = `${building} ${street}, ${city}`;
    } else {
      _address = `${street}, ${city}`;
    }
    return _address;
  }

  render() {
    const { address } = this.props;
    return (
      <div className={styles.addressProfile}>
        <Helmet title="Edit Address"/>
        <Header buttonText={'Back'}
          pageCaption={<span>Edit Address</span>}
          btnAction={this.handleClickBack.bind(this)}
        />

          <AddressEditForm
            initialValues={{
              address: this._addressFormat(),
              company: address.company,
              aptFloorSuite: address.apt_floor,
              notes: address.notes
            }}
            onSubmit={this.handleSubmitClick.bind(this)}
            handleRemove={this.handleRemoveAddressClick.bind(this)}
          />
          <ModalInfo
            onShow={this.onShowModal}
            onHide={this.onHideModal}
            showModal={this.state.showModal}
            onClickModalBtn={this.handleRemoveClick.bind(this, address.id)}
            onClickModalCancelBtn={this.onHideModal}
            modalInfoBtnOkName={'Ok'}
            modalInfoBtnCancelName={'Cancel'}
            modalInfoText={'Are you sure you want to delete this address?'}
          />
      </div>
    );
  }
}
