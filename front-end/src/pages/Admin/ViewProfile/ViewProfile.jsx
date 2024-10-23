import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../../components/auth/authService';

const AdminMentorProfile = () => {
    const [mentorProfile, setMentorProfile] = useState([]);
    const { accessToken, user } = useSelector( state => state.auth );
    const userId = user.user_id ;
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    

    useEffect( () => {
        const fetchMentorProfile = async () => {
            try{
                const response = await axiosInstance.get(`${baseUrl}/users/user-profile/${id}/`);
                const list = response.data;
                setMentorProfile(list);
            } catch (error) {
                console.error("Error while fetching details",error);
            }
        }
        fetchMentorProfile();
    },[])
    console.log(mentorProfile);
  return (
    <div className="min-w-full flex flex-col">  {/* Changed background to grey */}
    {/* Navbar */}
    <AdminNavbar />
    <div className="flex w-full h-full">
            <div className="w-1/4 lg:w-1/5">
                {/* Sidebar */}
                <AdminSidebar />
            </div>
            <div className="w-3/4 lg:w-4/5">
                {mentorProfile && (
                    <section className="py-10 my-auto ">
                        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">  {/* Changed form background to white */}
                                <div className="">
                                    <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-black">
                                        Profile
                                    </h1>
                                    <div>
                                        {/* Profile Picture */}
                                        <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: `url(${
                                                    mentorProfile?.profile_picture
                                                    ? mentorProfile.profile_picture
                                                    : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080"
                                                })`
                                            }}>
                                        </div>

                                        {/* Name Fields */}
                                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                            <div className="w-full mb-4 mt-6">
                                                <label className="mb-2 dark:text-black">First Name</label>
                                                <input
                                                    type="text"
                                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                    value={mentorProfile.first_name}
                                                    disabled
                                                />
                                            </div>

                                            <div className="w-full mb-4 lg:mt-6">
                                                <label className="dark:text-black">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                    value={mentorProfile.last_name}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        {/* Gender and Date of Birth */}
                                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                            <div className="w-full">
                                                <h3 className="dark:text-black mb-2">Gender</h3>
                                                <input
                                                    type="text"
                                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                    value={mentorProfile.gender}
                                                    disabled
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h3 className="dark:text-black mb-2">Date Of Birth</h3>
                                                <input
                                                    type="text"
                                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                    value={mentorProfile.date_of_birth}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <div className="w-full mb-4 mt-6">
                                            <label className="mb-2 dark:text-black">Bio</label>
                                            <textarea
                                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                value={mentorProfile.bio}
                                                disabled
                                            />
                                        </div>

                                        {/* Education Fields */}
                                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                            <div className="w-full">
                                                <h3 className="dark:text-black mb-2">Highest Education Qualification</h3>
                                                <input
                                                    type="text"
                                                    className="p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                    value={mentorProfile.highest_education_qualification}
                                                    disabled
                                                />
                                            </div>

                                            <div className="w-full">
                                                <label className="mb-2 dark:text-black">Experience</label>
                                                <input
                                                    type="text"
                                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                    value={mentorProfile.experience}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        {/* Specialisation */}
                                        <div className="w-full mb-4 mt-6">
                                            <label className="mb-2 dark:text-black">Specialisation</label>
                                            <input
                                                type="text"
                                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-black dark:border-gray-600"
                                                value={mentorProfile.specialisation}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                                        <button className="w-full p-4" onClick={ () => navigate('/admin/mentor-management') }>Back to Home</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    </div> 
  )
}

export default AdminMentorProfile
