import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const TopNav = () => {

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("name");
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <div className='bg-slate-300 h-12'>
        <h2 className='hover:cursor-pointer' onClick={handleLogout}>התנתק</h2>
        {status && <h1>{status}</h1>}
    </div>
  )
}
