import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/auxiliar';
const sideDrawer = (props) => {
    let attachedClasess = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasess = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed.bind(this)} />
            <div className={attachedClasess.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthtenticated={props.isAuthtenticated} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;