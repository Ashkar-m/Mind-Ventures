import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';
import { baseUrl } from '../../../components/auth/authService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {

  const [wishlist, setWishlist] = useState({ items: [] });
  const { accessToken } = useSelector( (state) =>  state.auth );
  const navigate = useNavigate();

  useEffect( () => {
    const fetchWishlit = async () => {

      try {
        const response = await axiosInstance.get(`${baseUrl}/wishlist/wishlist/`)
        const list =  response.data;
        setWishlist(list);

      } catch (error) {
        console.error('Error while Wishlist details',error);
        
      }
    }
    fetchWishlit();
  },[])
  console.log(wishlist);

  const removeFromWishlist = async (courseId)  => {
    try {
      await axiosInstance.delete(`${baseUrl}/wishlist/wishlist/${courseId}/`);
      setWishlist( (prevWishlist) => ({
        ...prevWishlist,
        items : prevWishlist.items.filter( (item) => item.course !== courseId),
      }));
    } catch (error) {
      console.error('Error removing the course from wishlist', error);
      
    }
  }
  

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Wishlist Container */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Courses in Your Wishlist</h2>

        <div className="flex flex-col space-y-6">
          {wishlist.items.length > 0 ? (
            wishlist.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{item.course_title}</h3>
                  <p className="text-gray-600 text-sm">Price: ₹{item.course_price}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-semibold" 
                    onClick={ () => navigate(`/course-detail/${item.course}`)}>
                      View Course
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm font-semibold"
                    onClick={() => removeFromWishlist(item.course)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20" id="empty-wishlist">
              <h3 className="text-gray-500 text-lg font-medium">Your wishlist is empty.</h3>
              <p className="text-gray-400">Browse our courses and add your favorites here.</p>
              <a href="/courses" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
                Browse Courses
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;