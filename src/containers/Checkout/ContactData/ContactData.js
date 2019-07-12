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
          placeholder: "Your name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };
  orderHandler = () => {
    this.setState({
      loading: true,
    });
    const order = {
      ingrendients: this.props.ingredients,
      price: this.props.price,
    };
    axios
      .post("orders.json", order)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => console.log(error))
      .finally(
        this.setState({
          loading: false,
        })
      );
  };

  inputChangeHandler = (prop, e) => {
    const orderForm = { ...this.state.orderForm };
    orderForm[prop].value = e.target.value;
    this.setState({ orderForm: orderForm });
  };

  render() {
    const orderForm = this.state.orderForm;
    let DynamicForm = Object.keys(orderForm).map(oFormKey => (
      <Input
        key={oFormKey}
        changed={this.inputChangeHandler}
        elementType={orderForm[oFormKey].elementType}
        elementConfig={{
          ...orderForm[oFormKey].elementConfig,
          ...{ key: oFormKey },
        }}
        value={orderForm[oFormKey].value}
      />
    ));

    let form = (
      <form>
        {DynamicForm}
        <Button btnTtpe="Success" clicked={this.orderHandler}>
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
