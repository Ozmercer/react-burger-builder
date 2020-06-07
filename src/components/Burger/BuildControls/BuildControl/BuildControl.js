import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}: {props.amount}</div>
        <button
            className={classes.Less}
            disabled={props.amount === 0}
            onClick={() => props.change(false)}>Less</button>
        <button
            className={classes.More}
            disabled={props.amount === 3}
            onClick={() => props.change()}>More</button>
    </div>
)

export default buildControl;