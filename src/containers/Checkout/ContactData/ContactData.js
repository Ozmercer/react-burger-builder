import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import { updateObject, checkValidity } from '../../../shared/utility';

const contactData = props => {
    const createFormField = (options) => {
        return {
            elementType: 'input',
            elementConfig: {
                type: options.type || 'text',
                placeholder: options.placeholder || '',
            },
            value: '',
            validation: options.rules || {},
            errors: null,
            touched: false,
        }
    }
    const [formIsValid, setFormIsValid] = useState(false)
    const [orderForm, setOrderForm] = useState({
        name: createFormField({placeholder: 'Your Name'}),
        country: createFormField({placeholder: 'County'}),
        steet: createFormField({placeholder: 'Street'}),
        zipCode: createFormField({placeholder: 'Zip Code', rules: { required: true, minLength: 4, maxLength: 8 }}),
        email: createFormField({placeholder: 'Email', type: 'email', rules: { required: true, isEmail: true }}),
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                placeholder: 'Select Method',
                options: [
                    { value: 'fastest', displayName: 'Fastest' },
                    { value: 'delayed', displayName: 'Delayed' },
                ],
            },
            value: 'fastets',
            validation: {},
            errors: {},
        },
    });

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (const identifier in orderForm) {
            formData[identifier] = orderForm[identifier].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId,
        };
        props.onOrderBurger(order, props.token);
    }

    const changedInputHandler = (event, inputId) => {
        const updatedElement = updateObject(orderForm[inputId], {
            value: event.target.value,
            touched: true,
            errors: checkValidity(event.target.value, orderForm[inputId].validation),
        })
        const updatedForm = updateObject(orderForm, { [inputId]: updatedElement });

        let isFormValid = true;

        for (const input in updatedForm) {
            if (updatedForm[input].errors && Object.keys(updatedForm[input].errors).length > 0) {
                isFormValid = false;
            }
        }

        setOrderForm(updatedForm);
        setFormIsValid(isFormValid)
    }

    const formAsArray = [];
    for (const key in orderForm) {
        formAsArray.push({
            id: key,
            config: orderForm[key],
        })
    }

    let form = (
        <React.Fragment>
            <h4>Enter your contact details</h4>
            <form onSubmit={orderHandler}>
                {formAsArray.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        errors={el.config.errors}
                        touched={el.config.touched}
                        changed={(event) => changedInputHandler(event, el.id)} />
                ))}
                <Button btnType="Success" disabled={!formIsValid} >ORDER</Button>
            </form>
        </React.Fragment>
    );
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(contactData, axios)));