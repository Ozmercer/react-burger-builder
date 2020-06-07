import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputEl = null;
    const inputClasses = [classes.InputEl];
    let errorsAsArray = [];

    if (props.errors && props.touched && Object.keys(props.errors).length) {
        inputClasses.push(classes.Invalid);
        errorsAsArray = Object.values(props.errors);
    }

    switch (props.elementType) {
        case ('input'):
            inputEl = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            )
            break;
        case ('textarea'):
            inputEl = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
            inputEl = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayName}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
            {errorsAsArray.map((error, i) => <small key={error} className={classes.Error} style={{bottom: -10 - (12 * i) + 'px'}}>{error}</small>)}
        </div>
    );
}

export default Input;