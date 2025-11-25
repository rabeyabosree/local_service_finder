// AuthCustomer.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthCustomer() {
  // localStorage থেকে string হিসাবে আসে, তাই parse করতে হবে
  const user = JSON.parse(localStorage.getItem("user"));

  // যদি user না থাকে বা role "customer" না হয়, login page এ পাঠাও
  if (!user || user.role !== "Customer") {
    return <Navigate to="/login" replace />;
  }

  // অন্যথায় child routes render হবে Outlet দিয়ে
  return <Outlet />;
}

export default AuthCustomer;

