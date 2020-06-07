import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const createFormField = (options) => {
        return {
            elementType: 'input',
            elementConfig: {
                type: options.type || 'text',
                placeholder: options.placeholder || '',
            },
            value: '',
            validation: options.rules || {},
            errors: {},
            touched: false,
        }
    }
    const [controls, setControls] = useState({
        email: createFormField({ placeholder: 'Email Address', type: 'email', rules: { required: true, isEmail: true } }),
        password: createFormField({ placeholder: 'Password', type: 'password', rules: { required: true, minLength: 6 } }),
    });
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, []);


    const changedInputHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                errors: checkValidity(event.target.value, controls[controlName].validation),
                touched: true,
            })
        })

        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthMode = () => {
        setIsSignup(!isSignup)
    }

    const formAsArray = [];
    for (const key in controls) {
        formAsArray.push({
            id: key,
            config: controls[key],
        })
    }

    let form = formAsArray.map(el => (
        <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            errors={el.config.errors}
            touched={el.config.touched}
            changed={(event) => changedInputHandler(event, el.id)}
        />
    ))

    if (props.loading) {
        form = <Spinner />
    }

    let errMsg = null;

    if (props.error) {
        errMsg = <p>{props.error.message}</p>
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <h2>{isSignup ? 'Sign up' : 'Login'}</h2>
            <form onSubmit={submitHandler}>
                {form}
                {errMsg}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                btnType="Danger"
                clicked={switchAuthMode} >SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);