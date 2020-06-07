import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../SideDraw/Hamburger/Hamburger';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Hamburger open={props.openSideDraw} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
)

export default toolbar;