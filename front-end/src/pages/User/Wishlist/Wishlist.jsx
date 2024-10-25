import React from 'react';

const Wishlist = () => {
  // Placeholder data for the wishlist items
  const wishlistItems = [
    {
      id: 1,
      title: 'Course Title',
      instructor: 'John Doe',
      description: 'A brief description of the course goes here, highlighting key topics and skills you’ll gain.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Course Title 2',
      instructor: 'Jane Doe',
      description: 'Another brief description of the course goes here with an introduction to its key topics.',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <a href="/dashboard" className="text-sm font-semibold hover:text-blue-200">Back to Dashboard</a>
        </div>
      </header>

      {/* Wishlist Container */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Courses in Your Wishlist</h2>

        {/* Wishlist Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={course.imageUrl} alt="Course Image" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                <p className="text-gray-600 text-sm">Instructor: {course.instructor}</p>
                <p className="text-gray-500 text-sm mt-2">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-semibold">
                    View Course
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm font-semibold">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* If No Courses in Wishlist */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-20" id="empty-wishlist">
            <h3 className="text-gray-500 text-lg font-medium">Your wishlist is empty.</h3>
            <p className="text-gray-400">Browse our courses and add your favorites here.</p>
            <a href="/courses" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
              Browse Courses
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
