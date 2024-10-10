import React, { useEffect, useRef, useState } from "react";
import { baseUrl } from "../../../components/auth/authService";
import MentorNavbar from "../Navbar/Navbar";
import MentorSidebar from "../Sidebar/Sidebar";
import axios from 'axios';
import { useSelector } from "react-redux";

const MentorProfile = () => {

    const [userProfile, setUserProfile] = useState([]);
    const formRef = useRef(null);
    const [userId, setUserId] = useState(null);

    const {accessToken} = useSelector(state => state.auth);
    console.log( accessToken );
    
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserId(user.user_id);
        }
    }, []);

    useEffect( () => {
        const fetchUserProfile = async () => {
            try{
                if (userId){
                    const response = await fetch(`${baseUrl}/users/user-detail/${userId}/`);
                if (!response.ok) {
                    throw new Error("Error fetching user profile");
                }
                const list = await response.json();
                setUserProfile(list);
                }
            } catch (error) {
                console.error("Error while fetching details",error);
            }
        }
        if (userId){
            fetchUserProfile();
        }
        
    },[userId]);
    console.log(userProfile);
    
    const updateUserProfile = async (formData) => {
        try {
            const url = `${baseUrl}/users/student-profile/${userId}/update/`;
    
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}` // Add the Authorization header
                }
            };
    
            const response = await axios.patch(url, formData, config);
            if (response.status === 200) {
                console.log("Profile updated successfully:", response.data);
                setUserProfile(response.data); 
            } else {
                throw new Error("Error updating user profile");
            }
        } catch (error) {
            console.error("Error while updating profile", error.response ? error.response.data : error.message);
        }
    };
    
    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedData = {
            profile_picture : formRef.current.elements.profile_picture.files[0],
            first_name : formRef.current.elements.first_name.value,
            last_name : formRef.current.elements.last_name.value,
            gender : formRef.current.elements.gender.value,
            date_of_birth : formRef.current.elements.date_of_birth.value,
            bio : formRef.current.elements.bio.value,
            highest_education_qualification : formRef.current.elements.highest_education_qualification.value,
            current_education_qualification : formRef.current.elements.current_education_qualification.value,
            expected_graduation_date : formRef.current.elements.expected_graduation_date.value,
        };
        const formData = new FormData();
        for (let key in updatedData) {
            if (updatedData[key]){
                formData.append(key, updatedData[key]);
            }
        }
        updateUserProfile(formData);
    }
    
    return (
        <div className="min-w-full" >
            {/* Navbar */}
            <MentorNavbar />

            {/* Sidebar */}
            <MentorSidebar />


            <div className="p-4 sm:ml-64 mt-16">
                <section className="py-10 my-auto dark:bg-gray-900">
                    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div className="">
                        <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                            Profile
                        </h1>
                        <form ref={formRef} onSubmit={handleUpdate}>
                            {/* Profile Picture */}
                            <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center">
                            <div
                                className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                                style={{
                                backgroundImage: `url(${
                                    userProfile?.profile_picture
                                    ? userProfile.profile_picture
                                    : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"
                                })`,
                                }}
                            >
                                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                                <input
                                    type="file"
                                    name="profile_picture"
                                    id="upload_profile"
                                    onChange={(e) => {
                                        const fileInput = formRef.current.elements.profile_picture;
                                        fileInput.files = e.target.files;
                                    }}
                                    hidden
                                    required
                                />
                                <label htmlFor="upload_profile">
                                    <svg
                                    data-slot="icon"
                                    className="w-6 h-5 text-blue-700"
                                    fill="none"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                    ></path>
                                    </svg>
                                </label>
                                </div>
                            </div>
                            </div>

                            {/* Name Fields */}
                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full mb-4 mt-6">
                                <label className="mb-2 dark:text-gray-300">First Name</label>
                                <input
                                type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="First Name"
                                name="first_name"
                                value={ userProfile?.first_name || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, first_name: e.target.value })}
                                />
                            </div>
                            <div className="w-full mb-4 lg:mt-6">
                                <label className="dark:text-gray-300">Last Name</label>
                                <input
                                type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="Last Name"
                                name="last_name"
                                value={ userProfile?.last_name || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, last_name: e.target.value })}
                                />
                            </div>
                            </div>

                            {/* Gender and Date of Birth */}
                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Gender</h3>
                                <select
                                className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                value={ userProfile?.gender || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                                name="gender"
                                >
                                <option disabled value="">
                                    Select Gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                                <input
                                type="date"
                                name="date_of_birth"
                                className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                value={ userProfile?.date_of_birth || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, date_of_birth: e.target.value })}
                                />
                            </div>
                            </div>

                            {/* Bio */}
                            <div className="w-full mb-4 mt-6">
                            <label className="mb-2 dark:text-gray-300">Bio</label>
                            <textarea
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="Bio"
                                name="bio"
                                value={ userProfile?.bio || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                            />
                            </div>

                            {/* Education Fields */}
                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Highest Education Qualification</h3>
                                <select
                                className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                name="highest_education_qualification"
                                value={ userProfile?.highest_education_qualification || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, highest_education_qualification: e.target.value })}
                                >
                                <option disabled value="">
                                    Select Qualification
                                </option>
                                <option value="diploma">Diploma</option>
                                <option value="sslc">SSLC</option>
                                <option value="highersecondary">Higher Secondary</option>
                                <option value="undergraduate">Under Graduate</option>
                                <option value="postgraduate">Post Graduate</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Current Education Qualification</h3>
                                <select
                                className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                name="current_education_qualification"
                                value={ userProfile?.current_education_qualification || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, current_education_qualification: e.target.value })}
                                >
                                <option disabled value="">
                                    Select Qualification
                                </option>
                                <option value="diploma">Diploma</option>
                                <option value="sslc">SSLC</option>
                                <option value="highersecondary">Higher Secondary</option>
                                <option value="undergraduate">Under Graduate</option>
                                <option value="postgraduate">Post Graduate</option>
                                </select>
                            </div>
                            </div>

                            {/* Expected Graduation Date */}
                            <div className="w-full mb-4 mt-6">
                            <label className="mb-2 dark:text-gray-300">Expected Graduation Date</label>
                            <input
                                type="date"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                name="expected_graduation_date"
                                value={ userProfile?.expected_graduation_date || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, expected_graduation_date: e.target.value })}
                            />
                            </div>
                            <div class="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                                <button type="submit" class="w-full p-4">Save</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MentorProfile;