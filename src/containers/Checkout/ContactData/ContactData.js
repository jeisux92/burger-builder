import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/order";
import { updateObject, checkValidity } from "../../../shared/utility";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false
  };
  orderHandler = e => {
    e.preventDefault();
    const formData = {};
    for (const input in this.state.orderForm) {
      formData[input] = this.state.orderForm[input].value;
    }
    const order = {
      ingrendients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (prop, e) => {
    const updatedFormElement = updateObject(this.state.orderForm[prop], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        this.state.orderForm[prop].validation
      ),
      touched: true
    });

    const orderForm = updateObject(this.state.orderForm, {
      [prop]: updatedFormElement
    })


    let formIsValid = true;
    for (let input in orderForm) {
      formIsValid = formIsValid && orderForm[input].valid;
    }

    this.setState({ orderForm: orderForm, formIsValid: formIsValid });
  };

  render() {
    const orderForm = this.state.orderForm;
    let DynamicForm = Object.keys(orderForm).map(oFormKey => (
      <Input
        key={oFormKey}
        changed={this.inputChangedHandler}
        elementType={orderForm[oFormKey].elementType}
        elementConfig={{
          ...orderForm[oFormKey].elementConfig,
          ...{ key: oFormKey }
        }}
        touched={orderForm[oFormKey].touched}
        shouldValidate={orderForm[oFormKey].validation}
        invalid={!orderForm[oFormKey].valid}
        value={orderForm[oFormKey].value}
      />
    ));

    let form = (
      <form onSubmit={this.orderHandler}>
        {DynamicForm}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(purchaseBurger(orderData, token))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
