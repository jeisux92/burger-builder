import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (<>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        /></>)
    }
    return (
      <div>
        {summary}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  purchased: state.order.purchased
})



export default connect(mapStateToProps)(Checkout);
