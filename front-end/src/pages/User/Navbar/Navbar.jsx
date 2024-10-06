import React from "react";
import { useNavigate } from "react-router-dom";


const UserNavbar = () => {

    const navigate = useNavigate();

    return (
        <nav className=" w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-10">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-center">
                <div className="flex items-center justify-start rtl:justify-end">
                    <a onClick={() => navigate('/home')} className="flex">
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MindVentures</span>
                    </a>
                </div>
                <div className="flex items-center">
                    </div>
                </div>

            </div>
            </nav>
    )
}

export default UserNavbar;