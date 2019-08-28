import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthtenticated ? <NavigationItem link="/orders" exact>Orders</NavigationItem> : null}
    {props.isAuthtenticated ? <NavigationItem link="/logout" exact>Logout</NavigationItem> : <NavigationItem link="/login" exact>Login</NavigationItem>}
  </ul>
);

export default navigationItems;
