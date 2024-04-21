import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserContext } from "./userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useUserContext();

  if (!isAuth) {
    alert("You must be signed in to access this page.");
    return <Navigate to={"/"} />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
