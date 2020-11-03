import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../components";
import Post from '../components/PostDetails/Post'

export const DashboardRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/posts/:id/:name/:des/:pic" component={Post} />
        </Switch>
    );
}
