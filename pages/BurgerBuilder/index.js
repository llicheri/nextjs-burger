import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Router from "next/router";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import { withLayout } from "../../components/Layout/Layout";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePuschasableValue(ingredidents) {
    const sum = Object.keys(ingredidents)
      .map(ingKey => {
        return ingredidents[ingKey];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCloseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseCancelHandler = () => {
    this.purchaseCloseHandler();
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    Router.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabled = {};
    for (const key in this.props.ings) {
      disabled[key] = this.props.ings[key] <= 0;
    }
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orders = null;
    if (this.props.ings) {
      orders = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          cancelled={this.purchaseCancelHandler}
          confirmed={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemove}
            disabled={disabled}
            price={this.props.price}
            purchasable={this.updatePuschasableValue(this.props.ings)}
            purchase={this.purchaseHandler}
          />
        </Auxiliary>
      );
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCloseHandler}
        >
          {orders}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => {
      dispatch(actions.addIngredient(ingName));
    },
    onIngredientRemove: ingName => {
      dispatch(actions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(actions.initIngredients());
    },
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default compose(
  withLayout,
  connect(mapStateToProps, mapDispatchToProps)
)(BurgerBuilder);
