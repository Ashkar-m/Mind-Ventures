import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../components/auth/authService";
import Footer from "../Footer/Footer";


const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState('');
    
    useEffect( () => {

        const fetchCourse = async () => {
            try{
                const response = await fetch(`${baseUrl}/courses/course-detail/${id}/`)

                if (!response.ok) {
                    throw new Error('Course does not exist');
                }
                
                const data = await response.json();
                setCourse(data);

            } catch (error) {
                console.error('Error while fetching course',error);
            }
        }
        fetchCourse();
    }, []);
    console.log(course);
    

    return(
        <div>

        <Navbar/>

        {/* <section className="py-8 mt-20 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                
                <img className="w-60 h-60 hidden dark:block" 
                src={course?.preview_image 
                    ? `${baseUrl}${course.preview_image}`
                    : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                } alt="course-image" />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1
                    className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                >
                    {course.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <p
                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                    >
                    {course.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                        <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                        </svg>
                    </div>
                    <p
                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                    >
                        (5.0)
                    </p>
                    <a
                        href="#"
                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                    >
                        345 Reviews
                    </a>
                    </div>
                </div>

                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <a
                    href="#"
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                    >
                    <svg
                        className="w-5 h-5 -ms-2 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                    </svg>
                    Add to favorites
                    </a>

                    <a
                    href="#"
                    title=""
                    className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                    role="button"
                    >
                    <svg
                        className="w-5 h-5 -ms-2 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                        />
                    </svg>

                    Add to cart
                    </a>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <p className="mb-6 text-gray-500 dark:text-gray-400">
                    {course.description}                
                </p>
                </div>
            </div>
            </div>
        </section> */}

<section className="py-12 bg-gray-50 dark:bg-gray-900 antialiased mt-20">
  <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
    {/* Course Overview Section */}
    <div className="lg:grid lg:grid-cols-2 lg:gap-16">
      {/* Course Media */}
      <div className="shrink-0 max-w-md lg:max-w-lg mx-auto lg:mx-auto lg:ml-12">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg ">
          <img
            className="object-cover w-50 h-50"
            src={
              course?.preview_image
                ? `${baseUrl}${course.preview_image}`
                : "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
            }
            alt="course-preview"
          />
        </div>
      </div>

      {/* Course Info */}
      <div className="mt-8 lg:mt-0">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {course.title}
        </h1>

        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-4">
          Instructor: <span className="text-primary-600 dark:text-primary-500">{course.mentor}</span>
        </p>

        {/* Price & Ratings */}
        <div className="mt-6 flex items-center gap-6">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {course.price}
          </p>
          <div className="flex items-center gap-2">
            {/* Star Ratings */}
            {[...Array(5)].map((_, idx) => (
              <svg
                key={idx}
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c-.368 0-.738.144-1.025.429L9.5 4.204 5.882 4.66C4.819 4.782 4.272 6.007 4.88 6.879l2.41 3.44-.743 3.771c-.24 1.213 1.016 2.185 2.068 1.557L12 15.583l3.384 1.828c1.052.627 2.308-.345 2.068-1.557l-.743-3.771 2.41-3.44c.608-.872.061-2.097-1.036-2.219l-3.618-.456L13.025 2.43A1.441 1.441 0 0 0 12 2z"
                />
              </svg>
            ))}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(5.0)</p>
            <a href="#" className="text-sm font-medium underline text-primary-600 dark:text-primary-500">
              345 Reviews
            </a>
          </div>
        </div>

        {/* Add to Cart and Wishlist */}
        <div className="mt-8 flex gap-4">
          <a
            href="#"
            className="flex items-center justify-center w-full py-3 px-6 font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h1.5L8 16h8M8 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5m3-7h5.688M17 4v6h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            Add to Cart
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-full py-3 px-6 font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            Add to Wishlist
          </a>
        </div>
      </div>
    </div>

    {/* Key Features Section */}
    {/* <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>
      <ul className="mt-6 space-y-4">
        {course.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-.368 0-.738.144-1.025.429L9.5 4.204 5.882 4.66C4.819 4.782 4.272 6.007 4.88 6.879l2.41 3.44-.743 3.771c-.24 1.213 1.016 2.185 2.068 1.557L12 15.583l3.384 1.828c1.052.627 2.308-.345 2.068-1.557l-.743-3.771 2.41-3.44c.608-.872.061-2.097-1.036-2.219l-3.618-.456L13.025 2.43A1.441 1.441 0 0 0 12 2z" />
            </svg>
            <p className="text-gray-700 dark:text-gray-300">{feature}</p>
          </li>
        ))}
      </ul>
    </div> */}

    {/* What You'll Learn */}
    {/* <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What You’ll Learn</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {course.learning_outcomes.map((outcome, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {outcome}
          </li>
        ))}
      </ul>
    </div> */}

    {/* Instructor Info */}
    {/* <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Instructor</h2>
      <div className="flex items-center mt-6">
        <img
          src={course.mentor
            ? `${baseUrl}${course.mentor.profile_picture}`
            : "https://via.placeholder.com/150"}
          alt={course.mentor}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.instructor_name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor_bio}</p>
        </div>
      </div>
    </div> */}

    {/* Course Description & Reviews Accordion */}
    <div className="mt-12">
      <div className="border-t border-b divide-y dark:divide-gray-700">
        <div className="py-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Course Description</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reviews</h3>
          {/* Add reviews section here */}
        </div>
      </div>
    </div>
  </div>
</section>


        <Footer />

        </div>
    )
}

export default CourseDetail;