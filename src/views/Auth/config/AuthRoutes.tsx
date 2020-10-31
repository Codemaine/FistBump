import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SignUp, Login, Forgotpass } from "../../Auth/components";

export const AuthRoutes = () => {
    return (
        <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/auth/forgot-password" component={Forgotpass} />
            <Redirect to="/auth/login" from="/auth" />
        </Switch>
    );
};