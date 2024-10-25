import React from 'react';

const Cart = () => {
  // Placeholder data for the cart items
  const cartItems = [
    {
      id: 1,
      title: 'Course Title',
      instructor: 'John Doe',
      price: 49.99,
      description: 'A brief description of the course goes here, highlighting key topics and skills you’ll gain.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Course Title 2',
      instructor: 'Jane Doe',
      price: 59.99,
      description: 'Another brief description of the course goes here with an introduction to its key topics.',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  // Calculate total price of cart items
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

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

        {/* Cart Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={course.imageUrl} alt="Course Image" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                <p className="text-gray-600 text-sm">Instructor: {course.instructor}</p>
                <p className="text-gray-500 text-sm mt-2">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-blue-500 font-bold text-lg">${course.price}</p>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-semibold">
                      View Course
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm font-semibold">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-gray-700 text-xl font-semibold">Cart Summary</h3>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 font-medium">Total Price:</p>
            <p className="text-gray-800 font-bold text-2xl">${totalPrice}</p>
          </div>
          <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>

        {/* If No Courses in Cart */}
        {cartItems.length === 0 && (
          <div className="text-center py-20" id="empty-cart">
            <h3 className="text-gray-500 text-lg font-medium">Your cart is empty.</h3>
            <p className="text-gray-400">Browse our courses and add them to your cart for easy checkout.</p>
            <a href="/courses" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
              Browse Courses
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
