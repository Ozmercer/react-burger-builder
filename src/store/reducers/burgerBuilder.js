import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 5.3,
    error: false,
    building: false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const addOrRemoveIngredient = (state, action, add = true) => {
    const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + (add ? 1 : -1) };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + (INGREDIENT_PRICES[action.ingredient] * (add ? 1 : -1)),
    };

    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    const claculateFullPrice = (ingredients) => {
        let price = 4;
        for (const ingredient in ingredients) {
            price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
        }
        return price;
    }
    return updateObject(state, {
        ...state,
        ingredients: action.ingredients,
        price: claculateFullPrice(action.ingredients),
        error: false,
        building: false,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addOrRemoveIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return addOrRemoveIngredient(state, action, false);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return updateObject(state, { error: true });
        case actionTypes.SUBMIT_INGREDIENTS: return updateObject(state, { building: true });
        default: return state;
    }
}

export default reducer;