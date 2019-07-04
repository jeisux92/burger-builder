import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/auxiliar';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(){
        console.log("order summary was update");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}:</span> {this.props.ingredients[igKey]}
                </li>
            })
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following  ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel.bind(this)}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue.bind(this)}>Continue</Button>
            </Aux>
        )
    }

}

export default OrderSummary;