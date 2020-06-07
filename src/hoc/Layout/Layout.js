import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDraw: false,
    }

    toggleSideDraw = (state = false) => {
        this.setState({ showSideDraw: state })
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} openSideDraw={this.toggleSideDraw} />
                <SideDraw
                    isAuth={this.props.isAuthenticated}
                    close={this.toggleSideDraw}
                    open={this.state.showSideDraw} />
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

export default connect(mapStateToProps)(Layout);