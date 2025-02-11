import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';
import { baseUrl } from '../../../components/auth/authService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Wishlist from '../Wishlist/Wishlist';
import UserNavbar from '../Navbar/Navbar';

const Cart = () => {

  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const { accessToken } = useSelector( (state) =>  state.auth );
  const navigate = useNavigate();

  
  useEffect( () => {
    const fetchCart = async () => {

      try {
        const response = await axiosInstance.get(`${baseUrl}/cart/`)
        const list =  response.data;
        setCart(list);

        const total = list.cart_items.reduce((sum, item) => sum + Number(item.course_price), 0);
        setTotalPrice(total);


      } catch (error) {
        console.error('Error while fetching cart details',error);
        
      }
    }
    fetchCart();
  },[])
  console.log(cart);

  const removeFromCart = async (courseId) => {
    
    try {
      await axiosInstance.delete(`${baseUrl}/cart/item/${courseId}/`);
      setCart((prevCart) => ({
        ...prevCart,
        cart_items: prevCart.cart_items.filter((item) => item.course !== courseId),
      }));
      const updateTotal = cart.cart_items
        .filter((item) => item.course  !== courseId)
        .reduce((sum, item) => sum + item.course_price, 0);
      setTotalPrice(updateTotal);
    } catch (error) {
      console.error('Error removing course from cart', error);
      }
  };

  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post(`${baseUrl}/orders/checkout/`,{
        items: cart.items,
        total: totalPrice,
      });
      if (response.status === 201) {
        setCart({ items: [] });
        setTotalPrice(0);
        navigate('/checkout')
      }
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

 
  return (
    
    <div className="mt-14 min-h-screen">
      <UserNavbar />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        {cart && cart.cart_items && cart.cart_items.length > 0 ? (
          <>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Course</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Price</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.cart_items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-6 py-4 flex items-center space-x-4">
                    <img  src={item?.course_image 
                        ? `${baseUrl}${item.course_image}`
                        : "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                        } 
                    alt={item.course_title} className="w-16 h-16 rounded-lg" />
                      <div>
                        <h3 className="font-bold text-gray-800">{item.course_title}</h3>
                        <button
                          className="text-blue-500 text-sm underline"
                          onClick={() => navigate(`/course-detail/${item.course}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">₹{item.course_price}</td>
                    <td className="px-6 py-4 flex items-center space-x-2">
                      {/* <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm font-semibold"
                        onClick={() => addToCart(item.course)}
                      >
                        Add to Cart
                      </button> */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm font-semibold"
                        onClick={() => removeFromCart(item.course)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Price and Checkout Button */}
            <div className="p-6 bg-white rounded-lg shadow-md text-right">
              <p className="text-xl font-semibold text-gray-700">Total Price: ₹{totalPrice}</p>
              <button onClick={ () => handleCheckout() } className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md text-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20" id="empty-wishlist">
            <h3 className="text-gray-500 text-lg font-medium">Your wishlist is empty.</h3>
            <p className="text-gray-400">Browse our courses and add your favorites here.</p>
            <a
              href="/courses"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
            >
              Browse Courses
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
