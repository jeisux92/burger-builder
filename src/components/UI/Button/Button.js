import React from 'react';
import classes from './Button.css'
const button = props => (
    <button type="button" onClick={props.clicked} className={[classes.Button, classes[props.btnType]].join(" ")}>
        {props.children}
    </button>
);


export default button;