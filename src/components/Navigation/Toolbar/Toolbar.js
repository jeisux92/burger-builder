import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import ProtoTypes from 'prop-types';
const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthtenticated={props.isAuthtenticated} />
        </nav>
    </header>
);

toolbar.protoTypes = {
    drawerToggleClicked: ProtoTypes.func.isRequired
}
export default toolbar;