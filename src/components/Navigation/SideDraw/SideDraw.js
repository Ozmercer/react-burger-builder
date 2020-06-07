import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDraw.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const sideDraw = (props) => {
    let attachedClasses = [classes.SideDraw];
    attachedClasses.push(props.open ? classes.Open : classes.Close)
    
    return (
        <Aux>
            <Backdrop show={props.open} close={props.close} />
            <div className={attachedClasses.join(' ')} onClick={() => props.close()}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>

    );
}

export default sideDraw;