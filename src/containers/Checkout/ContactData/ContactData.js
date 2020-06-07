import React, { Component } from 'react';
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

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.createFormField('Your Name'),
            country: this.createFormField('County'),
            steet: this.createFormField('Street'),
            zipCode: this.createFormField('Zip Code', '', { required: true, minLength: 4, maxLength: 8 }),
            email: this.createFormField('Email', 'email', {required: true, isEmail: true}),
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
        },
        formIsValid: false,
    }

    createFormField(placeholder = '', type = 'text', rules = { required: true }) {
        return {
            elementType: 'input',
            elementConfig: {
                type,
                placeholder,
            },
            value: '',
            validation: rules,
            errors: { defaultErr: 'This field is required' },
            touched: false,
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (const identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    changedInputHandler = (event, inputId) => {
        const updatedElement = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            touched: true,
            errors: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
        })
        const updatedForm = updateObject(this.state.orderForm, {[inputId]: updatedElement});

        let formIsValid = true;

        for (const input in updatedForm) {
            if (updatedForm[input].errors && Object.keys(updatedForm[input].errors).length > 0) {
                formIsValid = false;
            }
        }

        this.setState({ orderForm: updatedForm, formIsValid });
    }

    render() {
        const formAsArray = [];
        for (const key in this.state.orderForm) {
            formAsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <React.Fragment>
                <h4>Enter your contact details</h4>
                <form onSubmit={this.orderHandler}>
                    {formAsArray.map(el => (
                        <Input
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            errors={el.config.errors}
                            touched={el.config.touched}
                            changed={(event) => this.changedInputHandler(event, el.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
                </form>
            </React.Fragment>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));