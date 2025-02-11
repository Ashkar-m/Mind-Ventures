import React from "react";
import { useNavigate } from "react-router-dom";


const UserNavbar = () => {

    const navigate = useNavigate();

    return (
        // <nav className=" w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-10">
        //     <div className="px-3 py-3 lg:px-5 lg:pl-3">
        //         <div className="flex items-center justify-center">
        //         <div className="flex items-center justify-start rtl:justify-end">
        //             <a onClick={() => navigate('/home')} className="flex">
        //             <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MindVentures</span>
        //             </a>
        //         </div>
        //         <div className="flex items-center">
        //             </div>
        //         </div>

        //     </div>
        //     </nav>

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

    {/* <div class="mt-20 p-10">
        <h2 class="text-3xl font-bold">Welcome to MindVentures</h2>
        <p class="text-gray-700 mt-4">Explore new courses and enhance your learning experience.</p>
        <div class="mt-10 space-y-6">
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <p class="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <p class="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
    </div> */}


   </section>

    )
}

export default UserNavbar;