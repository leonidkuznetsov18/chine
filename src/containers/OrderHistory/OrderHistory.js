import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { load as historyLoad } from 'redux/modules/orderHistory';
import { push } from 'react-router-redux';
import { Header } from 'components';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './OrderHistory.scss';
// import logo from './logored.svg';
// import Isvg from 'react-inlinesvg';

@connect(
  state => ({
    user: state.auth.user,
    orderHistory: state.orderHistory.items
  }),
  {historyLoad, pushState: push})
export default class OrderHistory extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    historyLoad: PropTypes.func,
    orderHistory: PropTypes.array,
  };


  componentWillMount() {
    const { user, historyLoad } = this.props;
    historyLoad(user.id);
  }

  handleClickBack() {
    this.props.pushState('/');
  }

  handleOrderClick(orderId) {
    this.props.pushState(`/order-status/${orderId}?from=history`);
  }

  render() {
    const { orderHistory } = this.props;
    const renderItem = (orders) =>
      <div className={styles.orderHistory}>
        {orders.map((item, index) => {
          return (
            <div className={styles.orderHistoryCart} key={index}>
              <Grid>
                <Row onClick={this.handleOrderClick.bind(this, item.id)} className={styles.curPointer}>
                  <Col xs={12} md={12} sm={12} >
                    <div className={styles.orderHistoryImg}><img src={`/uploads/products/${item.orders[0].product.img}`} /></div>
                  </Col>
                  <Col xs={12} md={12} sm={12}>
                    <div className={styles.orderhistoryDate}><span>{moment(item.order_date).format('LL')}</span></div>
                  </Col>
                </Row>
              </Grid>
            </div>
          );
        })}
      </div>;

    return (
      <div>
        <Header buttonText={"Back"}
          isRed={false}
          pageCaption={<span>Order History</span>}
          btnAction={this.handleClickBack.bind(this)}
        />
        {orderHistory && renderItem(orderHistory)}
        {!orderHistory.length &&
          <div className={styles.orderHistory}>
            <div className="wrapHistoryButton">
            <h4 className="nothingText">
              THERE IS NOTHING YET.
              <br/>
              NOTHING AT ALL.
            </h4>

              <button className="redBtn" onClick={this.handleClickBack.bind(this)}>MAKE YOUR FIRST ORDER</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
