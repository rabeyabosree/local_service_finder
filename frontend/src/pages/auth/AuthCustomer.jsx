// AuthCustomer.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthCustomer() {
  
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "Customer") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthCustomer;

