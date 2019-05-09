import React, { Component } from "react";
import Aux from "../Auxiliary/auxiliar";
import classes from "./Layout.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
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
        <Toolbar drawerToggleClicked={this.sideSrawerTogglehandler} />
        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
        <main className={classes.content}>{this.props.children}</main>
      </Aux >
    )
  }
}

export default Layout;