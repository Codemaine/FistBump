import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthRoutes } from "../views/Auth";
import PrivateRoute from "../PrivateRoute";
import { DashboardRoutes } from "../views/Dashboard";
// import { Dashboard } from "../views/Dashboard/components";

const ApplicationRoutes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={DashboardRoutes} />
                <PrivateRoute path="/posts/:id/:name/:des/:pic" component={DashboardRoutes} />
                <Route path="/" component={AuthRoutes} />
                {/* <Route path="/" component={AuthRoutes} /> */}
            </Switch>
        </Router>
    );
}

export default ApplicationRoutes;