import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  const token = localStorage.getItem("token");
  if (!user.token && token === null) {
    window.alert('Please Login to access this page');
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
