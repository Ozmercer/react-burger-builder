import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';
import { connect } from 'react-redux';

const layout = props => {
    const [showSideDraw, setShowSideDraw] = useState(false)

    const toggleSideDraw = (state = false) => {
        setShowSideDraw(state)
    }

    return (
        <Aux>
            <Toolbar isAuth={props.isAuthenticated} openSideDraw={toggleSideDraw} />
            <SideDraw
                isAuth={props.isAuthenticated}
                close={toggleSideDraw}
                open={showSideDraw} />
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux >
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

export default connect(mapStateToProps)(layout);