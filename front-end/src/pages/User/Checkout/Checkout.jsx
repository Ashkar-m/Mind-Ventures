import React, { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from '../../../components/auth/authService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';

const Checkout = () => {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [checkout, setCheckout] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const { accessToken } = useSelector( (state) => state.auth );
  const navigate = useNavigate();

  // useEffect( () => {
  //   const fetchCheckout = async () => {
  //     try {
  //       const response = await axiosInstance.get(`${baseUrl}/orders/order/`)
  //       const list = response.data;
  //       setCheckout(list);

  //       const total = list.orders.reduce((sum, item) => sum + Number(item.course__price), 0);
  //       setTotalPrice(total);

  //     } catch (error) {
  //       console.error('Error while fetching cart details', error);
        
  //     }
  //   }
  //   fetchCheckout();
  // } ,[])
  // console.log(checkout);

  useEffect(() => {
    const fetchCheckout = async () => {
        try {
            const response = await axiosInstance.get(`${baseUrl}/orders/order/`);
            const ordersList = response.data; // Assuming this is now an array of orders
            setCheckout(ordersList);

            // Calculate total price across all orders
            const total = ordersList.reduce((sum, order) => {
                return sum + order.order_items.reduce((orderSum, item) => orderSum + Number(item.course__price), 0);
            }, 0);
            setTotalPrice(total);

        } catch (error) {
            console.error('Error while fetching cart details', error);
        }
    };
    fetchCheckout();
}, []);
console.log(checkout);

  
  const removeFromCheckout = async (courseId) => {
    try {
      await axiosInstance.delete(`${baseUrl}/orders/item/${courseId}/`);
      setCheckout((prevCheckout) => ({
        ...prevCheckout,
        order_items: prevCheckout.orders.filter((item) => item.course !== courseId),

      }));
      const updateTotal = checkout.orders
        .filter((item) => item.course  !== courseId)
        .reduce((sum, item) => sum + item.course_price, 0);
      setTotalPrice(updateTotal);

    } catch (error) {
      console.error('Error removing course from checkout page', error);
      
    }
  }
  
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: `${baseUrl}/orders/payment/success/`,
        mehtod : "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

      })
      .then((res) => {
        console.log("Everythins is OK!");
        setName("")
        setAmount("");
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(console.error());
    }
  }

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }

  const showRazorpay = async () => {
    const res = await loadScript();
    let bodyData = new FormData();
    bodyData.append("amount", amount);
    bodyData.append("name",name);

    const data = await axios({
      url : `${baseUrl}/orders/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res
    });

    var options = {
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
      amout: data.data.payment.amount,
      currency: "INR",
      name:"Org. Name",
      description: "Test transaction",
      image: "",
      order_id: data.data.payment.id,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }


  return (
    <div>
<div className="mt-14 min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        {checkout && checkout.orders && checkout.orders.length > 0 ? (
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
                {checkout.orders.map((item) => (
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
              <button onClick={ () => navigate('/checkout')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md text-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20" id="empty-wishlist">
            <h3 className="text-gray-500 text-lg font-medium">Your checkout page is empty.</h3>
            <p className="text-gray-400">Browse our courses and add to buy that course.</p>
            <a
              href="/course-list"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
            >
              Browse Courses
            </a>
          </div>
        )}
      </main>
    </div>
<div className="container" style={{ marginTop: "20vh" }}>
      <form>
        <h1>Payment page</h1>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form>
      <button onClick={showRazorpay} className="btn btn-primary btn-block">
        Pay with razorpay
      </button>
    </div>

    </div>
    
  )
}

export default Checkout
