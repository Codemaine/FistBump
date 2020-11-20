import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthRoutes } from "../views/Auth";
import PrivateRoute from "../PrivateRoute";
import { DashboardRoutes } from "../views/Dashboard";
import Missing from "../views/Auth/components/404";
// import { Dashboard } from "../views/Dashboard/components";

const ApplicationRoutes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={DashboardRoutes} />
                <PrivateRoute path="/user/:name" component={DashboardRoutes} />
                <PrivateRoute path="/settings" component={DashboardRoutes} />
                <PrivateRoute exact path="/search" component={DashboardRoutes} />
                <Route path="/" component={AuthRoutes} />

                {/* <Route path="/" component={AuthRoutes} /> */}
            </Switch>
        </Router>
    );
}

export default ApplicationRoutes;