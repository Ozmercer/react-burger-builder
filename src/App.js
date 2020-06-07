import React, { Suspense, useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orderes/Orders'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const app = props => {
  useEffect(() => {
    props.onTryAutoSignin();
  }, []);

  let routes = (
    <Switch>
      <Route path="/build" component={BurgerBuilder} />
      <Route path="/login" render={() => <Auth />} />
      <Redirect from='/' to="build" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/build" component={BurgerBuilder} />
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/login" render={() => <Auth />} />
        <Route path="/logout" render={() => <Logout />} />
        <Redirect from='/' to="build" />
      </Switch>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
