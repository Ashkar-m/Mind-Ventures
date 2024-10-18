import React, { useEffect, useState } from "react";
import { logout } from "../../../features/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const AdminHome = () => {
   
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        setUserDetails(user);
    }, [])

    useEffect( () => {
        const fetchUserInfo = async () => {
            if (userDetails) {
                try {
                    const id = userDetails['user_id']
                    const response = (await fetch(`http://127.0.0.1:8000/users/user-detail/${id}/`));
                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }
                    const info = await response.json();
                    setUserInfo(info);
                } catch (error) {
                    console.error('Error while fetching user details', error);
                    
                }
            }
        };
        fetchUserInfo();
    }, [userDetails]);

    useEffect( () => {
        if (userInfo && userInfo['role']) {
            const role = userInfo['role'];
            if (role === 'student') {
                navigate('/home')
            } else if ( role === 'mentor') {
                navigate('/mentor/home')
            } else if (role === 'admin') {
                navigate('/admin/home')
            }
        }
    }, [userInfo])

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('REFRESH_TOKEN')
        dispatch(logout());
        navigate('/admin/login')
      };

    return (
        
    <div className="w-full">
    
    {/* Navbar */}
    <AdminNavbar/>
    
    {/* Sidebar */}
    <AdminSidebar/>
    


    </div>


    )
}

export default AdminHome;