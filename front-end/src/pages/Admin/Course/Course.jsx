import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { baseUrl } from "../../../components/auth/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../../components/Bearer/axiosInterceptor";

const AdminCourseManagement = () => {
    const navigate = useNavigate();
    const [isActiveUpdated, setIsActiveUpdated] = useState(false);
    const [courseList, setCourseList] = useState([]);

    const { accessToken } = useSelector( state => state.auth )

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await axiosInstance.get(`${baseUrl}/courses/course-list/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Ensure valid accessToken is used
                    },
                });
    
                // Axios doesn't need response.ok, handle it with status code directly
                setCourseList(response.data); // Directly use response.data
            } catch (error) {
                // Improved error handling to check for common issues
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Error:', error.response.status, error.response.data);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('No response from server:', error.request);
                } else {
                    // Something else happened in setting up the request
                    console.error('Error setting up request:', error.message);
                }
            }
        };
    
        fetchCategoryList();
    }, [isActiveUpdated, accessToken]); // Make sure to include accessToken in dependencies if it can change
    
    
    const handleToggleStatus = async (categoryId) => {
        try {
            const response = await axios.post(`${baseUrl}/courses/category/toggle-status/${categoryId}/`);
            console.log('Status updated:', response.data);
            setIsActiveUpdated((prev) => !prev);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }
    const handleCourseClick = (courseId) => {
        navigate(`/admin/course-preview/${courseId}`); // Adjust the path based on your routing structure
    };

    // Example function to approve a course
    const approveCourse = async (courseId) => {
        try {
            const response = await fetch(`${baseUrl}/courses/${courseId}/change-status/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Add your auth token here
                },
                body: JSON.stringify({ action: 'approve' }),
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log('Course approved:', data);
                window.location.reload(); // Refresh the page after approval
            } else {
                console.error('Error approving course:', data);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    // Example function to reject a course
    const rejectCourse = async (courseId) => {
        try {
            const response = await fetch(`${baseUrl}/courses/${courseId}/change-status/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Add your auth token here
                },
                body: JSON.stringify({ action: 'reject' }),
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log('Course rejected:', data);
                window.location.reload(); // Refresh the page after approval
            } else {
                console.error('Error rejecting course:', data);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };


    return (
        <div className="w-full">

            {/* Navbar */}

            <AdminNavbar />

            {/* Sidebar */}

            <AdminSidebar />

            {/* Course management body part */}

            <div className="p-4 sm:ml-64 mt-20 ">
            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border ">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-center gap-8 mb-8">
                    <div>
                        <h3
                        className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Course List
                        </h3>
                    </div>
                    </div>
                    <div className="flex items-center justify-end gap-8 mb-8">
                    <div className="relative h-10 w-full min-w-[200px]">
                        <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                            </svg>
                        </div>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Search
                        </label>
                        </div>
                    <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <button onClick={ ()=> navigate('/admin/add-course')}
                        className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            strokeWidth="2" className="w-4 h-4">
                            <path
                            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                            </path>
                        </svg>
                        Add Course
                        </button>
                    </div>
                    </div>
                </div>
                <div className="p-6 px-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                    <thead>
                        <tr>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Course
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Description
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th 
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Category
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Course Image
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Duration
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Price
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Mentor
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Status
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                            </svg>
                            </p>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        { courseList.map( (course) => (
                                <tr key={ course.id }  >
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-700 text-blue-gray-900" onClick={ () => handleCourseClick(course.id)}>
                                        { course.title } 
                                        </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900" style={{
                                            maxWidth: '25ch',  
                                            wordWrap: 'break-word'  
                                        }}>
                                        { course.description }
                                        </p>
                                    </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    { course.category }
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <img
                                    src={course?.preview_image 
                                    ? `${baseUrl}${course.preview_image}`
                                    : "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                                    }
                                    alt="course-image"
                                    className="w-40 h-25 object-cover rounded-lg mb-4" // Fixed height, full width, and object cover for proper image sizing
                                />
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    { course.duration }
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    { course.price }
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    { course.mentor } - { course.mentor_role }
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    { course.status }
                                   
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {/* <div 
                                        onClick={() => handleToggleStatus(course.id)}
                                        className={`inline-block px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                                            course.active
                                                ? 'bg-red-500/20 text-red-900'
                                                : 'bg-green-500/20 text-green-900'
                                        }`}
                                    >
                                        <span>{course.active ? 'Delete' : 'Admit'}</span>
                                    </div> */}
                                     <div 
                                    className={`inline-block px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap  bg-green-500/20 text-green-900`}
                                    >
                                        <span onClick={ () => approveCourse(course.id)}>APPROVE</span>
                                    </div>
                                    <div 
                                    className={`inline-block px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-red-500/20 text-red-900`}
                                    >
                                        <span onClick={ () => rejectCourse(course.id)}>REJECT</span>
                                    </div>
                                </td>
                                
                                </tr>
                            ))}
                    </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Page 1 of 10
                    </p>
                    <div className="flex gap-2">
                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Previous
                    </button>
                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Next
                    </button>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default AdminCourseManagement;