import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  state = {
    orders: {},
    error: false,
  };

  componentDidMount() {
    axios
      .get("orders.json")
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    let orders = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map(key => (
        <Order 
        ingredients={this.state.orders[key].ingrendients } 
        price={this.state.orders[key].price}
        key={key} />
      ));
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
