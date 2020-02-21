import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Spinner/Spinner";
import { withLayout } from "../../components/Layout/Layout";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default compose(
  withLayout,
  connect(mapStateToProps, mapDispatchToProps)
)(withErrorHandler(Orders, axios));
