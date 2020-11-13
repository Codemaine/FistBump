import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { authenticated, loadingAuthState } = useContext(AuthContext);

    if (loadingAuthState) {

        return (
            <div>
                <div className="text-center">
                    <div className="spinner-border" style={{ marginLeft: '50vw', width: '5rem', height: '5rem' }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={routeProps =>
                authenticated ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={{ pathname: "/login", state: { prevPath: rest.path } }} />
                    )
            }
        />
    );
}

export default PrivateRoute