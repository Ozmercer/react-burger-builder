import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const ingredientList = [];
    for(let type in props.ingredients) {
        for (let i = 0; i < props.ingredients[type]; i++) {
            if (type !== 'salad') {
                ingredientList.push(<BurgerIngredient type={type} key={type + i} />)
            } else {
                ingredientList.unshift(<BurgerIngredient type={type} key={type + i} />)
            }
        }
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientList.length ? ingredientList : <p>Please start adding ingredients</p>}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;