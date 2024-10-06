import React, { useState } from "react";
import UserNavbar from "../Navbar/Navbar";
import UserSidebar from "../Sidebar/Sidebar";

const UserDashboard = () => {

    return (
        <div className="w-full">
            {/* Navbar */}
            <UserNavbar />

            {/* Sidebar */}
            <UserSidebar />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14" style={{ borderColor: '#E0E0E0' }}>
                    
                    {/* Course Progress Section */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col items-center justify-center h-24 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                            <p className="text-xl" style={{ color: '#4A4A4A' }}>Course Progress</p>
                            <p className="text-2xl font-semibold" style={{ color: '#007BFF' }}>75%</p>
                        </div>
                        <div className="flex flex-col items-center justify-center h-24 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                            <p className="text-xl" style={{ color: '#4A4A4A' }}>Completed Courses</p>
                            <p className="text-2xl font-semibold" style={{ color: '#28A745' }}>5</p>
                        </div>
                        <div className="flex flex-col items-center justify-center h-24 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                            <p className="text-xl" style={{ color: '#4A4A4A' }}>Enrolled Courses</p>
                            <p className="text-2xl font-semibold" style={{ color: '#FFC107' }}>8</p>
                        </div>
                    </div>

                    {/* Upcoming Class */}
                    <div className="flex items-center justify-center h-48 mb-4 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                        <div className="text-center">
                            <p className="text-xl mb-2" style={{ color: '#4A4A4A' }}>Next Class: JavaScript Basics</p>
                            <p className="text-lg" style={{ color: '#6C757D' }}>Date: 25th Sept 2024</p>
                            <p className="text-lg" style={{ color: '#6C757D' }}>Time: 10:00 AM - 11:30 AM</p>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col items-center justify-center h-28 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                            <p className="text-xl" style={{ color: '#4A4A4A' }}>Recent Activities</p>
                            <ul className="list-disc list-inside text-sm" style={{ color: '#6C757D' }}>
                                <li>Completed Quiz: React Basics</li>
                                <li>Joined Class: Python 101</li>
                                <li>Started Course: Django Advanced</li>
                            </ul>
                        </div>
                        
                        {/* Notifications */}
                        <div className="flex flex-col items-center justify-center h-28 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                            <p className="text-xl" style={{ color: '#4A4A4A' }}>Notifications</p>
                            <ul className="list-disc list-inside text-sm" style={{ color: '#6C757D' }}>
                                <li>New Assignment: CSS Layout</li>
                                <li>Live Class Tomorrow: SQL Basics</li>
                            </ul>
                        </div>
                    </div>

                    {/* Enrolled Courses */}
                    <div className="flex items-center justify-center h-48 mb-4 rounded" style={{ backgroundColor: '#F7F7F7' }}>
                        <div className="text-center">
                            <p className="text-xl" style={{ color: '#4A4A4A' }}>Enrolled Courses</p>
                            <ul className="list-disc list-inside text-sm" style={{ color: '#6C757D' }}>
                                <li>Full Stack Web Development</li>
                                <li>Data Science with Python</li>
                                <li>Machine Learning A-Z</li>
                                <li>Advanced JavaScript</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserDashboard;