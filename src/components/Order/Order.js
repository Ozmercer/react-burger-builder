import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (const ingredient in props.ingredients) {
        ingredients.push({ amount: props.ingredients[ingredient], type: ingredient })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
        style={{
            textTransform: 'capitalize',
            display: 'inlin-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px',
         }}
            key={ig.type}>
            {ig.type} ({ig.amount})
            </span>
    })

    return (
        <div className={classes.Order}>
            <p>
                Ingredients:
                {ingredientOutput}
            </p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;