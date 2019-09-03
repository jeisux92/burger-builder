import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/login" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>{route}</Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token != null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(authCheckState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
