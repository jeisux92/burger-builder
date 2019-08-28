import React, { Component } from "react";
import Aux from "../Auxiliary/auxiliar";
import classes from "./Layout.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideSrawerTogglehandler = () => {
    this.setState((prevState) => (
      { showSideDrawer: !prevState.showSideDrawer })
    );
  }
  render() {
    return (
      <Aux>
        <Toolbar isAuthtenticated={this.props.isAuthtenticated} drawerToggleClicked={this.sideSrawerTogglehandler} />
        <SideDrawer isAuthtenticated={this.props.isAuthtenticated} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
        <main className={classes.content}>{this.props.children}</main>
      </Aux >
    )
  }
}

const mapStateToProps = state => ({
  isAuthtenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);