import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../components";
import Search from '../components/Searchfield'
import Settings from "../components/Settings";
import User from '../components/User'

export const DashboardRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/user/:name" component={User} />
        </Switch>
    );
}
