import React, { useEffect, useState } from "react";
import UserNavbar from "../Navbar/Navbar";
import UserSidebar from "../Sidebar/Sidebar";
import { baseUrl } from "../../../components/auth/authService";

const UserProfile = () => {

    const [userProfile, setUserProfile] = useState([]);
    const userId = 16 ;

    useEffect( () => {
        const fetchUserProfile = async () => {
            try{
                const response = await fetch(`${baseUrl}/users/user-profile/${userId}`);
                if (!response.ok) {
                    throw new Error("Error fetching user profile");
                }
                const list = await response.json();
                setUserProfile(list);
            } catch (error) {
                console.error("Error while fetching details",error);
            }
        }
        fetchUserProfile();
    },[])
    console.log(userProfile);

    
    return (
        <div className="min-w-full" >
            {/* Navbar */}
            <UserNavbar />

            {/* Sidebar */}
            <UserSidebar />

            {/* <div className="p-4 sm:ml-64 mt-16 ">
                <section class="py-10 my-auto dark:bg-gray-900">
                    <div class="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                        <div
                            class="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                            <div class="">
                                <h1
                                    class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                                    Profile
                                </h1>
                                <form>
                                    <div
                                        class="w-full rounded-sm  bg-cover bg-center bg-no-repeat items-center">
                                       <div
                                            class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">

                                            <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                                                <input type="file" name="profile" id="upload_profile" hidden required />

                                                <label for="upload_profile">
                                                        <svg data-slot="icon" class="w-6 h-5 text-blue-700" fill="none"
                                                            stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                                            </path>
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                                            </path>
                                                        </svg>
                                                    </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                        <div class="w-full  mb-4 mt-6">
                                            <label for="" class="mb-2 dark:text-gray-300">First Name</label>
                                            <input type="text"
                                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                                    placeholder="First Name" />
                                        </div>
                                        <div class="w-full  mb-4 lg:mt-6">
                                            <label for="" class=" dark:text-gray-300">Last Name</label>
                                            <input type="text"
                                                    class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                                    placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                        <div class="w-full">
                                            <h3 class="dark:text-gray-300 mb-2">Sex</h3>
                                            <select
                                                    class="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                                    <option disabled value="">Select Sex</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                        </div>
                                        <div class="w-full">
                                            <h3 class="dark:text-gray-300 mb-2">Date Of Birth</h3>
                                            <input type="date"
                                                    class="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" />
                                        </div>
                                    </div>
                                    <div class="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                                        <button type="submit" class="w-full p-4">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}

            <div className="p-4 sm:ml-64 mt-16">
                <section className="py-10 my-auto dark:bg-gray-900">
                    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div className="">
                        <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                            Profile
                        </h1>
                        <form>
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
                                    name="profile"
                                    id="upload_profile"
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
                                value={ userProfile?.highest_education_qualification || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, highest_education_qualification: e.target.value })}
                                >
                                <option disabled value="">
                                    Select Qualification
                                </option>
                                <option value="Diploma">Diploma</option>
                                <option value="SSLC">SSLC</option>
                                <option value="Higher Secondary">Higher Secondary</option>
                                <option value="Under Graduate">Under Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <h3 className="dark:text-gray-300 mb-2">Current Education Qualification</h3>
                                <select
                                className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                value={ userProfile?.current_education_qualification || "" } // populate dynamically
                                onChange={ (e) => setUserProfile({ ...userProfile, current_education_qualification: e.target.value })}
                                >
                                <option disabled value="">
                                    Select Qualification
                                </option>
                                <option value="Diploma">Diploma</option>
                                <option value="SSLC">SSLC</option>
                                <option value="Higher Secondary">Higher Secondary</option>
                                <option value="Under Graduate">Under Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                </select>
                            </div>
                            </div>

                            {/* Expected Graduation Date */}
                            <div className="w-full mb-4 mt-6">
                            <label className="mb-2 dark:text-gray-300">Expected Graduation Date</label>
                            <input
                                type="date"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
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

export default UserProfile;