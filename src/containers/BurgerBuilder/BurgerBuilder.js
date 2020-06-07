import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/';

const burgerBuilder = props => {
    const [showSummary, setShowSummary] = useState(false);
    const { initIngredients } = props;

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const updateIngredientHandler = (type, add = true) => {
        if ((!add && !props.ingredients[type]) || (add && props.ingredients[type] >= 3)) {
            return;
        }
        add ? props.addIngredient(type) : props.removeIngredient(type);
    }

    const isPurchasable = (ingredients) => {
        return !!Object.keys(ingredients).find(item => ingredients[item] > 0);
    }

    const toggleModal = (state = false) => {
        props.onSubmitIngredients();
        if (props.isAuth) {
            setShowSummary(state)
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/login');
        }
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout')
    }

    const orderSummary = (
        <OrderSummary
            ingredients={props.ingredients} close={toggleModal}
            price={props.price}
            cancel={toggleModal}
            submit={purchaseContinueHandler} />
    );

    const burger = props.error ? <p>Cannot connect to server</p> :
        props.ingredients ? (
            <Aux>
                <Modal show={showSummary} close={toggleModal}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    ingredients={props.ingredients}
                    change={updateIngredientHandler}
                    price={props.price}
                    disabled={!isPurchasable(props.ingredients)}
                    isAuth={props.isAuth}
                    order={toggleModal} />
            </Aux>
        ) : <Spinner />

    return (
        <Aux>
            {burger}
        </Aux>
    )
}

const mapStoreToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: !!state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onSubmitIngredients: () => dispatch(actions.submitIngredients()),
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));