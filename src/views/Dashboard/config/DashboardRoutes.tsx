import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../components";
import Post from '../components/PostDetails/Post'
import Search from '../components/Searchfield'

export const DashboardRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/posts/:id/:name/:des/:pic" component={Post} />
        </Switch>
    );
}
