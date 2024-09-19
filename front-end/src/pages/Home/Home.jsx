import React from 'react';
import { logout } from '../../features/authReducer';
import { useDispatch } from 'react-redux';


export default function Home() {
  const dispatch=useDispatch()
  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('REFRESH_TOKEN')
    dispatch(logout())
  }
  
  return (
    <div>
      <h1>hey</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
        
    </div>
  )
}
