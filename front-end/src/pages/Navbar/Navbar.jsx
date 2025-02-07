
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/authReducer';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('REFRESH_TOKEN')
    dispatch(logout())
    navigate('/login')
  }

  const navigate = useNavigate();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed left-0 right-0 top-0 z-10">
      {/* <Logo/> */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a onClick={() => navigate('/home')} className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="hey" className="h-8" alt="Flowbite Logo" /> */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MindVentures</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse " >
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" /> */}
            
        <div className=" relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
        </div>

          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a onClick={ () => navigate('/student/dashboard') } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a onClick={ () => navigate('/wishlist') } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Wishlist</a>
                </li>
                <li>
                  <a onClick={ () => navigate('/cart') } className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cart</a>
                </li>
                <li>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
                </li>
              </ul>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a onClick={ () => navigate('/home') } className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a onClick={ () => navigate('/course-list') } className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Courses</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../features/authReducer';
// import { Menu, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('ACCESS_TOKEN');
//     localStorage.removeItem('REFRESH_TOKEN');
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-md dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a onClick={() => navigate('/home')} className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">
//           MindVentures
//         </a>
//         <div className="hidden md:flex space-x-6">
//           <a onClick={() => navigate('/home')} className="text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 cursor-pointer">Home</a>
//           <a onClick={() => navigate('/course-list')} className="text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 cursor-pointer">Courses</a>
//           <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">About</a>
//           <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">Services</a>
//           <a href="#" className="text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">Contact</a>
//         </div>
        
//         <div className="relative">
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <Menu.Button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
//                 <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
//                   <span className="font-medium text-gray-900 dark:text-white">JL</span>
//                 </div>
//                 <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-600 dark:text-gray-300" />
//               </Menu.Button>
//             </div>
//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 <div className="px-4 py-3 border-b dark:border-gray-700">
//                   <p className="text-sm text-gray-900 dark:text-white">Bonnie Green</p>
//                   <p className="text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</p>
//                 </div>
//                 <div className="py-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a onClick={() => navigate('/student/dashboard')} className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${active ? 'bg-gray-100 dark:bg-gray-600' : ''} cursor-pointer`}>Dashboard</a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a onClick={() => navigate('/wishlist')} className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${active ? 'bg-gray-100 dark:bg-gray-600' : ''} cursor-pointer`}>Wishlist</a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a onClick={() => navigate('/cart')} className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${active ? 'bg-gray-100 dark:bg-gray-600' : ''} cursor-pointer`}>Cart</a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a onClick={handleLogout} className={`block px-4 py-2 text-sm text-gray-700 dark:text-white ${active ? 'bg-gray-100 dark:bg-gray-600' : ''} cursor-pointer`}>Logout</a>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
