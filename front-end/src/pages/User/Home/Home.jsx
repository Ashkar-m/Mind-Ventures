import React from 'react';
import { logout } from '../../../features/authReducer';
import { useDispatch } from 'react-redux';
import Navbar from '../../Navbar/Navbar';


export default function Home() {
  const dispatch=useDispatch()
  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('REFRESH_TOKEN')
    dispatch(logout())
  }
  
  return (
    <div>
      <Navbar/>
      <div className="mt-16">
      <h1>hey</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
        
    </div>
  )
}
