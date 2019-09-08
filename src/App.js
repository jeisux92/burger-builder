import React, { Component, lazy, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Auth = lazy(() => import("./containers/Auth/Auth"));
class App extends Component {
  state = {
    route: ""
  };

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let route = (
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/login" exact component={Auth} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      route = (
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path="/login" exact component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Redirect to={this.state.route} />
          </Switch>
        </Suspense>
      );
    }
    return (
      <div>
        <Layout>{route}</Layout>
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
)(withRouter(App));
