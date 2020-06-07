import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: this.createFormField('Email Address', 'email', { required: true, isEmail: true }),
            password: this.createFormField('Password', 'password', { required: true, minLength: 6 }),
        },
        isSignup: false,
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
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
            errors: {},
            touched: false,
        }
    }

    changedInputHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                errors: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            })
        })

        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formAsArray = [];
        for (const key in this.state.controls) {
            formAsArray.push({
                id: key,
                config: this.state.controls[key],
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
                changed={(event) => this.changedInputHandler(event, el.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        }

        let errMsg = null;

        if (this.props.error) {
            errMsg = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <h2>{this.state.isSignup ? 'Sign up' : 'Login'}</h2>
                <form onSubmit={this.submitHandler}>
                    {form}
                    {errMsg}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthMode} >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);