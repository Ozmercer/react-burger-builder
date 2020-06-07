import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/build">Builder</NavigationItem>
        {props.isAuth ?
            <React.Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment> :
            <NavigationItem link="/login">Login</NavigationItem>
        }
    </ul>
)

export default navigationItems;