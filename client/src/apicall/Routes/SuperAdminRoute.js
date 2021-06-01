import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../apicall";

const SuperAdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role >= 5 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default SuperAdminRoute;
