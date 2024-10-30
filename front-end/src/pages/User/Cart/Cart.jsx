import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';
import { baseUrl } from '../../../components/auth/authService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const [cart, setCart] = useState({ items: [] });
  const { accessToken } = useSelector( (state) =>  state.auth );
  const navigate = useNavigate();

  
  useEffect( () => {
    const fetchCart = async () => {

      try {
        const response = await axiosInstance.get(`${baseUrl}/cart/`)
        const list =  response.data;
        setCart(list);

      } catch (error) {
        console.error('Error while fetching cart details',error);
        
      }
    }
    fetchCart();
  },[])
  console.log(cart);

 
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Cart</h1>
          <a href="/dashboard" className="text-sm font-semibold hover:text-blue-200">Back to Dashboard</a>
        </div>
      </header>

      {/* Cart Container */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Courses in Your Cart</h2>

 
         <div className="flex flex-col space-y-6">
         
          {cart && cart.cart_items && cart.cart_items.length > 0 ? (
            cart.cart_items.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800">{course.course_title}</h3>
                        <p className="text-gray-600 text-sm">Price: ₹{course.course_price}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-semibold" 
                            onClick={() => navigate(`/course-detail/${course.course}`)}>
                                View Course
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm font-semibold"
                            onClick={() => removeFromCart(course.course)}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-20" id="empty-wishlist">
                <h3 className="text-gray-500 text-lg font-medium">Your cart is empty.</h3>
                <p className="text-gray-400">Browse our courses and add your favorites here.</p>
                <a href="/courses" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
                    Browse Courses
                </a>
            </div>
        )}

        </div>

        {/* Cart Summary */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-gray-700 text-xl font-semibold">Cart Summary</h3>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 font-medium">Total Price:</p>
          </div>
          <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>

      </main>
    </div>
  );
};

export default Cart;
