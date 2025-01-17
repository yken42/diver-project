import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage

  // Check if a valid token exists
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;