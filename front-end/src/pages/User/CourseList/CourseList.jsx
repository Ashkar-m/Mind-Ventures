import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { baseUrl } from '../../../components/auth/authService';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';
import { useSelector } from 'react-redux';
import _ from 'lodash';


export default function CourseList() {

    const navigate = useNavigate();
    const [refetch, setRefetch] = useState(false); 
    const [courses, setCourses] = useState([]);
    const { accessToken } = useSelector( state => state.auth )
    const [categories, setCategories] = useState({
        programming: false,
        design: false,
        marketing: false,
      });
    
      const [difficulty, setDifficulty] = useState('');
      const [priceRange, setPriceRange] = useState([0, 100]);
      const [ratings, setRatings] = useState(0);
      const [language, setLanguage] = useState('');
    
      const handleCategoryChange = (e) => {
        setCategories({
          ...categories,
          [e.target.name]: e.target.checked,
        });
      };

    useEffect( () => {
        const fetchCourses = async () => {
            try{
                const response = await axiosInstance.get(`${baseUrl}/courses/course-list/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                    },
                });
                const course = response.data
                // setCourses(course);
                if (!_.isEqual(course, courses)) {
                    setCourses(course);
                }
            } catch (error) {
                console.error("Error while fetching the course:",error);
            }
        }
        fetchCourses();
        // Poll the server every 5 seconds to check for course updates
        const intervalId = setInterval(fetchCourses, 5000); // Fetch every 5 seconds

        // Cleanup interval when the component unmounts
        return () => clearInterval(intervalId);
    },[courses])
    console.log(courses);

    const handleButton = (courseId) => {
        navigate(`/course-detail/${courseId}`)
    }
    
    const handleWishlistClick = async (courseId) => {
      console.log(courseId);
      
      try {
        const response = await axiosInstance.post(
          `${baseUrl}/wishlist/wishlist/`,
          { course_id: courseId }, // data goes directly here, no "body" needed
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = response.data;
        navigate('/wishlist');
      } catch (error) {
        console.error('Error adding to wishlist', error);
      }
    };

    const handleCartClick = async (courseId) => {
      console.log(courseId);

      try {
        const response = await axiosInstance.post(
          `${baseUrl}/cart/item/`,
          { course_id : courseId },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = response.data;
        navigate('/cart')
      } catch (error) {
        console.error('Error adding to cart', error);
        
      }
      
    }
    

  return (
    
    <div className="min-w-full flex flex-col" >
        <Navbar/>
        <div className="flex w-full h-full">
            {/* <div className="w-1/4 lg:w-1/5">
            <div 
            className=" flex mt-5 max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 fixed top-14 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 ">
            <div className="p-4 mb-2">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Sidebar
                </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                <div role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                Dashboard
                </div>
                <div role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                E-Commerce
                </div>
                <div role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                Inbox
                <div className="grid ml-auto place-items-center justify-self-end">
                    <div
                    className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                    <span className="">14</span>
                    </div>
                </div>
                </div>
                <div role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                Profile
                </div>
                <div role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                Settings
                </div>
                <div role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                Log Out
                </div>
            </nav>
            </div>
            </div> */}
            <div className="w-1/4 lg:w-1/5">
      <div 
        className="flex mt-5 max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 fixed top-14 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0"
      >
        <div className="p-4 mb-4">
          <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Filters
          </h5>
        </div>
        <nav className="flex flex-col gap-4 p-2 font-sans text-base font-normal text-blue-gray-700 overflow-y-auto">
          
          {/* Categories Filter */}
          <div>
            <h6 className="mb-2 font-semibold">Categories</h6>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="programming"
                  checked={categories.programming}
                  onChange={handleCategoryChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Programming</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="design"
                  checked={categories.design}
                  onChange={handleCategoryChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Design</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={categories.marketing}
                  onChange={handleCategoryChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Marketing</span>
              </label>
            </div>
          </div>
          
          {/* Difficulty Level Filter */}
          <div>
            <h6 className="mb-2 font-semibold">Difficulty Level</h6>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <h6 className="mb-2 font-semibold">Price Range ($)</h6>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
          </div>
          
          {/* Ratings Filter */}
          <div>
            <h6 className="mb-2 font-semibold">Ratings</h6>
            <select
              value={ratings}
              onChange={(e) => setRatings(Number(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Any</option>
              <option value={1}>1 Star & Up</option>
              <option value={2}>2 Stars & Up</option>
              <option value={3}>3 Stars & Up</option>
              <option value={4}>4 Stars & Up</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          
          {/* Language Filter */}
          <div>
            <h6 className="mb-2 font-semibold">Language</h6>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          
          {/* Apply Filters Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                // Implement filter logic here
                console.log({ categories, difficulty, priceRange, ratings, language });
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>

        </nav>
      </div>
    </div>

            <div className="w-3/4 lg:w-4/5 mt-14">
            <div className='flex flex-wrap justify-between'>
            { courses.map( (course, index) => (
                <div className="relative flex flex-col my-5 bg-white shadow-sm border border-slate-200 rounded-lg w-72 ">
        
                <div key={index} className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img 
                src={course?.preview_image 
                    ? `${baseUrl}${course.preview_image}`
                    : "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                } 
                alt="course-image" 
                />
                    
                </div>
                <div className="p-4">
                    <div className="flex items-center mb-2">
                    <h6 className="text-slate-800 text-xl font-semibold">
                        {course.title}
                    </h6>
                
                    <div className="flex items-center gap-0 5 ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="w-5 h-5 text-yellow-600">
                        <path fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clip-rule="evenodd"></path>
                        </svg>
                        <span className="text-slate-600 ml-1.5">5.0</span>
                    </div>
                    </div>
                    
                    <p className="text-slate-600 leading-normal font-light">
                        {course.description}
                    </p>
                </div>
                
                <div className="group my-3 inline-flex flex-wrap justify-center items-center gap-2">
                   
                  <button
                    onClick={() => handleWishlistClick(course.id)}
                    className="rounded-full border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>


                    
                    <button 
                    onClick={() => handleCartClick(course.id)}
                    className="rounded-full border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M7 4h10l1 2H8L7 4zm0 1.5h10l1.5 3H8L7 5.5zM2 3h2l3.5 9h11l1.5-3H8.585L7.414 8H19c1.21 0 2.207.894 2.448 2.062L22 10c0 1.104-.896 2-2 2H8.585L7 12.5H19c1.105 0 2 .896 2 2s-.895 2-2 2H6l-1-2H2v-2h2l3.5-9H2z" />
                          <circle cx="9" cy="21" r="1.5" />
                          <circle cx="18" cy="21" r="1.5" />
                      </svg>
                  </button>

                    
                </div>
                
                <div className="px-4 pb-4 pt-0 mt-2">
                    <button onClick={ () => handleButton(course.id)} className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    View Details
                    </button>
                </div>
                </div>
            ))}
            </div>

            <Footer/>

            </div>
        </div>
        
    </div>
  )
}
