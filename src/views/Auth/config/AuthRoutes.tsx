import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SignUp, Login, Forgotpass } from "../../Auth/components";
import Missing from '../components/404'
import Reset_Password from '../../Auth/components/resetpassword'

export const AuthRoutes = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={Forgotpass} />
            <Route path="/reset-password/:id" component={Reset_Password} />
            <Route path="/404" component={Missing} />
            <Redirect to="/404" from="*" />
            <Redirect to="/login" from="/auth" />
        </Switch>
    );
};