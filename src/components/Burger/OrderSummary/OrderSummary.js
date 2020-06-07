import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const summary = Object.keys(props.ingredients).map(item => {
        return (
            <li key={item}><span style={{ textTransform: 'capitalize' }}>{item}</span>: {props.ingredients[item]}</li>
        )
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>
                {summary}
            </ul>
            <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.close}>CANCEL</Button>
            <Button btnType="Success" clicked={props.submit}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;