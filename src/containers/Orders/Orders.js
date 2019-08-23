import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { fetchOrders } from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = Object.keys(this.props.orders).map(key => (
        <Order
          ingredients={this.props.orders[key].ingrendients}
          price={this.props.orders[key].price}
          key={key}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: token => dispatch(fetchOrders(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
