import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
          maxLength: 5
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
          required: true
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
    formIsValid: false,
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const formData = {};
    for (const input in this.state.orderForm) {
      formData[input] = this.state.orderForm[input].value;
    }
    const order = {
      ingrendients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post("orders.json", order)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => console.log(error))
      .finally(
        this.setState({
          loading: false
        })
      );
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= 5 && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= 5 && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (prop, e) => {
    const orderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...orderForm[prop] };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    orderForm[prop] = updatedFormElement;

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
    if (this.state.loading) {
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

export default ContactData;
