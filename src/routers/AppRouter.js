import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
    const { user: { logged } } = useContext( AuthContext );

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/" component={ DashboardRoutes } /> */}

                    <PublicRoute path="/login" isAuth={ logged } component={ LoginScreen } />
                    <PrivateRoute path="/" isAuth={ logged } component={ DashboardRoutes } />
                </Switch>
            </div>
        </Router>
    );
};
