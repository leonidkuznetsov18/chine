import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Header, ViewCard, ModalInfo } from 'components';
import { cardList, cardSetDefault, cardRemove } from 'redux/modules/card';
import { push } from 'react-router-redux';
import styles from './Card.scss';
import { load as loadAuth } from 'redux/modules/auth';
import _ from 'lodash';

@connect(
  (state) => ({
    user: state.auth.user,
    cards: state.card.items
  }),
  {cardSetDefault, cardRemove, cardList, loadAuth, pushState: push})
export default class List extends Component {
  static propTypes = {
    user: PropTypes.object,
    cardList: PropTypes.func,
    loadAuth: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    cardSetDefault: PropTypes.func,
    cards: PropTypes.array,
    cardRemove: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentWillMount() {
    const { cardList, user } = this.props;
    cardList(user.id);
  }

  onHideModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleSetState(cardId) {
    const { user, cardSetDefault, cardList, cards, loadAuth } = this.props;
    const card = _.find(cards, {id: cardId, is_default: true});
    if (!card) {
      cardSetDefault(user.id, cardId).then(() => {
        cardList(user.id).then(() => {
          loadAuth(user.token);
        });
      });
    }
  }

  handleRemoveClick(cardId) {
    const { user, cardRemove, cardList, loadAuth } = this.props;
    cardRemove(cardId).then(() => {
      loadAuth(user.token).then(() => {
        cardList(user.id);
      });
    });
    this.onHideModal();
  }

  handleRedirectToAddCard() {
    if (location.search === '?add-card') {
      this.props.pushState('/profile/card/add?add-card');
    } else {
      this.props.pushState('/profile/card/add');
    }
  }

  handleClickBack() {
    let state = '/';
    if (location.search === '?add-card') state = '/cart';
    this.props.pushState(state);
  }

  render() {
    const { cards } = this.props;
    const renderItem = (_cards) =>
      <div className={styles.cardWrapItems}>
        {_cards.map((item, index) => {
          const cardTitle = <div className={styles.cardTitle}><span>{`**** **** **** ${item.card_no}`}<br/>EXP. {item.exp_date[0] + item.exp_date[1]} / {item.exp_date[2] + item.exp_date[3]}</span></div>;
          return (
            <ViewCard
              key={index}
              isChecked={item.is_default}
              onChange={this.handleSetState.bind(this, item.id)}
              handleRemove={this.handleRemoveClick.bind(this, item.id)}
              id={item.id}
              name={cardTitle}/>
            );
        })}
      </div>;
    return (
      <div className={styles.card}>
        <Helmet title="Payment"/>
        <Header buttonText={'Back'}
                pageCaption={<span>Payment</span>}
                btnAction={this.handleClickBack.bind(this)}
        />
          <div className={styles.cardBook}>
            {cards && renderItem(cards)}
            <div className={styles.cardWrapButtons}>
              <button onClick={this.handleRedirectToAddCard.bind(this)} className={styles.redBtn}>ADD CARD</button>
            </div>
          </div>
          {this.state.showModal &&
          <ModalInfo
            onShow={this.onShowModal}
            onHide={this.onHideModal}
            showModal={this.state.showModal}
            onClickModalBtn={this.handleRemoveClick.bind(this)}
            onClickModalCancelBtn={this.onHideModal}
            modalInfoBtnOkName={'Ok'}
            modalInfoBtnCancelName={'Close'}
            modalInfoText={'Are you sure you want to delete this card?'}
          />
        }
       </div>
    );
  }
}
