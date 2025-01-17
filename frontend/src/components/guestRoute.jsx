import React from 'react'
import { Navigate } from 'react-router-dom'

export const guestRoute = () => {

    const token = localStorage.getItem("jwtToken");

  return token ? <Navigate to="/home" replace /> : children;
}
