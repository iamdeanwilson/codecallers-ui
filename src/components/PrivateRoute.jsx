import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) {
    window.alert('Please Login to access this page');
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
