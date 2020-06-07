import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>

            {controls.map((control, i) => {
                return <BuildControl
                    label={control.label}
                    amount={props.ingredients[control.type]}
                    change={(add) => props.change(control.type, add)}
                    key={control + i} />
            })}
            <button 
            className={classes.OrderButton} 
            disabled={props.disabled}
            onClick={() => props.order(true)}>{props.isAuth ? 'Order Now' : 'SIGNUP TO ORDER'}</button>
        </div>
    )
}

export default buildControls;