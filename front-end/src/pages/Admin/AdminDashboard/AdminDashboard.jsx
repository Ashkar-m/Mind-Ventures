import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AdminDashboard = () => {

    return (
        
    <div className="w-full">
    
    {/* Navbar */}
    <AdminNavbar/>

    {/* Sidebar */}
    <AdminSidebar/>
    

    

    </div>


    )
}

export default AdminDashboard;