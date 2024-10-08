import React, { useEffect, useState } from "react";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";
// import './MentorHome.css'

const MentorHome = () => {
    const [userDetails, setUserDetails] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserDetails(user);
    }, [])


    return (
        
    <div className="w-full">
        {/* Navbar */}
        <MentorNavbar />

        {/* Sidebar */}
        <MentorSidebar />

    <div className="p-4 sm:ml-64">
    </div>
    </div>


    )
}

export default MentorHome;