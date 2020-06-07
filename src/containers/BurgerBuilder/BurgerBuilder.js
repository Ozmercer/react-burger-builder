import React, { Component } from 'react';
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

export class BurgerBuilder extends Component {
    state = {
        showSummary: false,
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    updateIngredientHandler = (type, add = true) => {
        if ((!add && !this.props.ingredients[type]) || (add && this.props.ingredients[type] >= 3)) {
            return;
        }
        add ? this.props.addIngredient(type) : this.props.removeIngredient(type);
    }

    isPurchasable = (ingredients) => {
        return !!Object.keys(ingredients).find(item => ingredients[item] > 0);
    }

    toggleModal = (state = false) => {
        this.props.onSubmitIngredients();
        if (this.props.isAuth) {
            this.setState({ showSummary: state })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        }
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render() {
        const orderSummary = (
            <OrderSummary
                ingredients={this.props.ingredients} close={this.toggleModal}
                price={this.props.price}
                cancel={this.toggleModal}
                submit={this.purchaseContinueHandler} />
        );

        const burger = this.props.error ? <p>Cannot connect to server</p> :
            this.props.ingredients ? (
                <Aux>
                    <Modal show={this.state.showSummary} close={this.toggleModal}>
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredients={this.props.ingredients}
                        change={this.updateIngredientHandler}
                        price={this.props.price}
                        disabled={!this.isPurchasable(this.props.ingredients)}
                        isAuth={this.props.isAuth}
                        order={this.toggleModal} />
                </Aux>
            ) : <Spinner />

        return (
            <Aux>
                {burger}
            </Aux>
        )
    }
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

export default connect(mapStoreToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));