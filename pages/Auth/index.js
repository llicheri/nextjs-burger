import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import classes from "./Auth.module.css";
import * as action from "../../store/actions/index";
import { withLayout } from "../../components/Layout/Layout";

class Auth extends Component {
  state = {
    orderForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your password"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSingUp: true
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = isValid && value.trim() !== "";
      }
      if (rules.minLength) {
        isValid = isValid && value.length <= rules.minLength;
      }
      if (rules.maxLength) {
        isValid = isValid && value.length >= rules.maxLength;
      }
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
      ...this.state.orderForm,
      [inputIdentifier]: {
        ...this.state.orderForm[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true
      }
    };

    this.setState({ orderForm: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.orderForm.email.value,
      this.state.orderForm.password.value,
      this.state.isSingUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSingUp: !prevState.isSingUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    const form = formElementsArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          changed={event => this.inputChangedHandler(event, formElement.id)}
          touched={formElement.config.touched}
        />
      );
    });
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSingUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) =>
      dispatch(action.auth(email, password, isSignedUp))
  };
};

export default compose(withLayout, connect(null, mapDispatchToProps))(Auth);
