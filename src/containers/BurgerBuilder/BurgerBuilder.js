import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/';

const burgerBuilder = props => {
    const [showSummary, setShowSummary] = useState(false);

    const dispatch = useDispatch();

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.price);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => !!state.auth.token);

    const addIngredient = (ingredient) => dispatch(actions.addIngredient(ingredient));
    const removeIngredient = (ingredient) => dispatch(actions.removeIngredient(ingredient));
    const initIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    const onSubmitIngredients = () => dispatch(actions.submitIngredients());

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const updateIngredientHandler = (type, add = true) => {
        if ((!add && !ingredients[type]) || (add && ingredients[type] >= 3)) {
            return;
        }
        add ? addIngredient(type) : removeIngredient(type);
    }

    const isPurchasable = (ingredients) => {
        return !!Object.keys(ingredients).find(item => ingredients[item] > 0);
    }

    const toggleModal = (state = false) => {
        onSubmitIngredients();
        if (isAuth) {
            setShowSummary(state)
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/login');
        }
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout')
    }

    const orderSummary = (
        <OrderSummary
            ingredients={ingredients} close={toggleModal}
            price={price}
            cancel={toggleModal}
            submit={purchaseContinueHandler} />
    );

    const burger = error ? <p>Cannot connect to server</p> :
        ingredients ? (
            <Aux>
                <Modal show={showSummary} close={toggleModal}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredients={ingredients}
                    change={updateIngredientHandler}
                    price={price}
                    disabled={!isPurchasable(ingredients)}
                    isAuth={isAuth}
                    order={toggleModal} />
            </Aux>
        ) : <Spinner />

    return (
        <Aux>
            {burger}
        </Aux>
    )
}

export default withErrorHandler(burgerBuilder, axios);