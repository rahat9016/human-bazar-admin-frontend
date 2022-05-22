import { Navigate } from "react-router-dom";
import React from "react";
function PrivateRoute({ children }) {
  let auth = window.localStorage.getItem("token");
  return auth ? children : <Navigate to="/signing" />;
}
export default PrivateRoute;
