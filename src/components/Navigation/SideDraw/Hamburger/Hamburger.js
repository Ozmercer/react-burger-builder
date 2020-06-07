import React from 'react';
import classes from './Hamburger.css'

const hamburger = (props) => (
    <div className={classes.Hamburger} onClick={() => props.open(true)}>
        <div className={classes.Line}></div>
    </div>
)
 
export default hamburger;