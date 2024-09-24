import React, { useEffect, useState } from 'react';
import { logout } from '../../../features/authReducer';
import { useDispatch } from 'react-redux';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserDetails(user);
  }, [])

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userDetails) {
        try{
          const id = userDetails['user_id']
          const response = await fetch(`http://127.0.0.1:8000/users/user-detail/${id}/`);
          if (!response.ok) {
            throw new Error('Failed to fetcch user details');
          }
          const info = await response.json();
          setUserInfo(info);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }   
      }
    };
    fetchUserInfo();
  }, [userDetails]);

  useEffect(() => {
    if (userInfo && userInfo['role']) {
      const role = userInfo['role'];  // Safely access the role from userInfo
      console.log('Role:', role);  // Check if the role is correctly assigned
  
      if (role === 'mentor') {
        navigate('/mentor/home');
      } else if (role === 'student') {
        navigate('/home');
      } else if (role === 'admin') {
        navigate('/admin/home/')
      }
    }
  }, [userInfo]);


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
