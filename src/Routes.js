import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { auth, notAuth, checkRole } from "./utils/utils-auth";
//components
import RootLayout from './components/RootLayout/RootLayout';
import Login from './pages/Login/Login'
import ROUTES from './configs/routes';
import DashBoard from './pages/DashBoard/DashBoard'
import ErrorPage404 from './pages/ErrorPage404/ErrorPage404';

const Routes = () => {
    return (
        <RootLayout>
            <Switch>
                {/* Not Auth Route */}
                <Route exact path={ROUTES.LOGIN} component={notAuth(Login)} />
                <Route exact path={ROUTES.HOME} component={notAuth(DashBoard)} />
                <Route exact path={ROUTES.ERROR} component={notAuth(ErrorPage404)} />
                {/* Auth Route */}
                {/* <Route exact path={ROUTES.HOME} component={auth(checkRole(  AdminDashboard ,HomePage))} /> */}
                <Redirect from="/" to={ROUTES.HOME} />
            </Switch>
        </RootLayout>
    )
};

export default Routes;
