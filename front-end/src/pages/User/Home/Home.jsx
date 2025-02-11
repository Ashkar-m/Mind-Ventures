import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/authReducer';


export default function Home() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const dispatch = useDispatch();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserDetails(user);
  }, [])
  
  useEffect(() => {
    const fetchUserInfo = async () => {
        if (userDetails) {
            try {
                const id = userDetails['user_id'];
                const response = await fetch(`http://127.0.0.1:8000/users/user-detail/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const info = await response.json();
                
                // Check if the user is verified
                if (!info.is_verified) {
                    localStorage.removeItem('ACCESS_TOKEN')
                    localStorage.removeItem('REFRESH_TOKEN')
                    dispatch(logout())
                    navigate('/login')
                } else {
                    // If verified, update userInfo
                    setUserInfo(info);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };
    fetchUserInfo();
}, [userDetails, userInfo]); // Add userInfo as a dependency to re-render on change

  // useEffect(() => {
  //   if (userInfo && userInfo['role']) {
  //     const role = userInfo['role'];  // Safely access the role from userInfo
  //     console.log('Role:', role);  // Check if the role is correctly assigned
  
  //     if (role === 'mentor') {
  //       navigate('/mentor/home');
  //     } else if (role === 'student') {
  //       navigate('/home');
  //     } else if (role === 'admin') {
  //       navigate('/admin/home/')
  //     }
  //   }
  // }, [userInfo]);

  

   
  return (
    <div>
      {/* <Navbar/> */}

   <section className='bg-gray-100'>
   <nav  className="fixed top-0 left-0 w-full z-50 p-4 shadow-lg text-white
      bg-[rgba(113,78,170,0.7)] backdrop-blur-lg transition-all duration-300 
      hover:bg-[rgba(64,36,109,0.9)]">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-extrabold tracking-wide hover:text-yellow-400 transition duration-300">MindVentures</h1>

            <div class="hidden md:flex space-x-6">
                <a onClick={() => navigate('/about')} class="hover:text-yellow-400 font-semibold transition duration-300">About</a>
                <a href="#" class="hover:text-yellow-400 font-semibold transition duration-300">Wishlist</a>
                <a onClick={ () => navigate('/course-list')} class="hover:text-yellow-400 font-semibold transition duration-300">Courses</a>
                <a onClick={() => navigate('/student/profile')} class="hover:text-yellow-400 font-semibold transition duration-300">Student Profile</a>
            </div>

            <a href="#" class="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 shadow-md">Login</a>
        </div>
    </nav>

    <div class="mt-20 p-10">
        <h2 class="text-3xl font-bold">Welcome to MindVentures</h2>
        <p class="text-gray-700 mt-4">Explore new courses and enhance your learning experience.</p>
        <div class="mt-10 space-y-6">
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <p class="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <p class="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
    </div>


   </section>

    
    {/* Footer section */}
    <Footer/>
    </div>
  )
}
