import React, { useEffect } from 'react'
import { TopNav } from './TopNav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ReservationList } from './reservationList';

export const UserDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/verify", {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Authentication failed: ", error);
        navigate('/login')
      }
    }

    verifyToken();
  }, [navigate])

  return (
    <>
    <TopNav />
        <div className='navigation'>
            <h1>Hello User</h1>
            <ReservationList />
        </div>
    </>
  )
}
