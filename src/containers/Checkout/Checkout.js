import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = props => {
    const cancelCheckoutHandler = () => {
        props.history.goBack();
    }

    const continueCheckoutHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to='/' />;

    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;

        summary = (
            <React.Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancel={cancelCheckoutHandler}
                    continue={continueCheckoutHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </React.Fragment>

        )
    }
    return (
        <div>
            {summary}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(checkout);