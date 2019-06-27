import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderHandler = () => {
    this.setState({
      loading: true
    })
    const order = {
      ingrendients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Gabriel',
        adress: {
          street: 'Calle 170',
          zipCode: '407035',
          country: 'Colombia'
        },
        email: 'jei.sum41@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('orders.json', order)
      .then(response => {
        this.props.history.push("/")
      })
      .catch(error => console.log(error))
      .finally(
        this.setState({
          loading: false
        })
      )
  }
  render() {
    let form = (<form>
      <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
      <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
      <input className={classes.Input} type="text" name="street" placeholder="Street" />
      <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
      <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
    </form>);
    if (this.state.loading) {
      form = <Spinner />
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
