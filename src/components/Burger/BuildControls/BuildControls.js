import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
const controls = [
    {
        label: 'Salad', type: 'salad'
    },
    {
        label: 'Bacon', type: 'bacon'
    }, {
        label: 'Cheese', type: 'cheese'
    },
    {
        label: 'Meat', type: 'meat'
    }
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current price:<strong> {props.price.toFixed(2)}</strong></p>
        {controls.map(control => (<BuildControl
            key={control.label}
            label={control.label}
            disabled={props.disabled[control.type]}
            removed={props.ingredientRemoved.bind(this, control.type)}
            added={props.ingredientAdded.bind(this, control.type)} />))}
    </div>
);

export default buildControls;