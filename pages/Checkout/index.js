import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Router from "next/router";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { withLayout } from "../../components/Layout/Layout";

class Checkout extends Component {
  componentDidMount() {
    if (!this.props.ings || this.props.purchased) {
      Router.push("/");
    }
  }

  checkoutCancelledHandler = () => {
    Router.back();
  };

  checkoutContinuedHandler = () => {
    Router.replace("/contactdata");
  };

  render() {
    let summary = null;

    if (this.props.ings) {
      console.log(Router.pathname);
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default compose(withLayout, connect(mapStateToProps))(Checkout);
