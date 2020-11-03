import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SignUp, Login, Forgotpass } from "../../Auth/components";

export const AuthRoutes = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={Forgotpass} />
            <Redirect to="/login" from="/auth" />
        </Switch>
    );
};