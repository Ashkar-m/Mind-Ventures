
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../components/auth/authService';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';

const AdminChapterManagement = () => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchChaptersList = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get(`${baseUrl}/courses/chapter-list/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // Sort chapters by the 'order' field if available
                const sortedChapters = response.data.sort((a, b) => a.order - b.order);
                setChapters(sortedChapters);
            } catch (error) {
                console.error('Error while fetching chapters:', error.message);
                setError('Failed to load chapters. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchChaptersList();
    }, [id, accessToken]);

    // Function to extract YouTube video ID from URL
    const getYouTubeVideoID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+&v=)|youtu\.be\/)([^&?\/\s]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="flex">
            <AdminNavbar />

            <AdminSidebar />

            <div className="p-8 sm:ml-64 w-full  min-h-screen">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Chapters List</h2>

                {loading ? (
                    <p className="text-center text-blue-500">Loading chapters...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {chapters.map((chapter) => (
                            <div key={chapter.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {chapter.order}. {chapter.title}
                                </h3>
                                <p className="text-gray-700 mb-4">{chapter.content}</p>
                                {chapter.video_url && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${getYouTubeVideoID(chapter.video_url)}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="rounded-md"
                                        ></iframe>
                                    </div>
                                )}
                                <div className="mt-4">
                                <input
                                    type="text"
                                    name="video_url"
                                    id=""
                                    value={chapter.video_url}
                                    className="w-full p-2 border border-gray-300 rounded-md text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    readOnly
                                />
                                <button
                                    className="mt-2 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Change URL
                                </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChapterManagement;


// import React, { useEffect, useState } from 'react';

// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { baseUrl } from '../../../components/auth/authService';
// import axiosInstance from '../../../components/Bearer/axiosInterceptor';
// import AdminNavbar from '../AdminNavbar/AdminNavbar';
// import AdminSidebar from '../AdminSidebar/AdminSidebar';

// const AdminChapterManagement = () => {
//     const [chapters, setChapters] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editUrl, setEditUrl] = useState(null);
//     const { id } = useParams();
//     const { accessToken } = useSelector((state) => state.auth);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchChaptersList = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const response = await axiosInstance.get(`${baseUrl}/courses/chapter-list/${id}/`, {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const sortedChapters = response.data.sort((a, b) => a.order - b.order);
//                 setChapters(sortedChapters);
//             } catch (error) {
//                 console.error('Error while fetching chapters:', error.message);
//                 setError('Failed to load chapters. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchChaptersList();
//     }, [id]);

//     console.log(chapters);
    

//     const getYouTubeVideoID = (url) => {
//         const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+&v=)|youtu\.be\/)([^&?\/\s]+)/;
//         const match = url.match(regex);
//         return match ? match[1] : null;
//     };

//     const handleChangeUrl = async (chapterId, newUrl) => {
//         try {
//             const response = await axiosInstance.patch(
//                 `${baseUrl}/courses/chapter-detail/${chapterId}/`,
//                 { video_url: newUrl },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             );
//             setChapters((prevChapters) =>
//                 prevChapters.map((chapter) =>
//                     chapter.id === chapterId ? { ...chapter, video_url: response.data.video_url } : chapter
//                 )
//             );
//         } catch (error) {
//             console.error('Failed to update video URL:', error.message);
//         }
//     };

//     const addCourse = () => {
//         navigate('/mentor/add-chapter')
//     }
//     return (
//         <div className="flex">
//             <AdminNavbar />

//             <AdminSidebar />

//             <div className="p-8 sm:ml-64 w-full min-h-screen">
//                 <h2 className="text-3xl font-semibold text-gray-800 mb-6">Chapters List</h2>

//                 {loading ? (
//                     <p className="text-center text-blue-500">Loading chapters...</p>
//                 ) : error ? (
//                     <p className="text-center text-red-500">{error}</p>
//                 ) : chapters.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center">
//                         <p className="text-center text-gray-500 mb-4">No chapters found.</p>
//                         <button
//                             className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                             onClick={() => addCourse () }
//                         >
//                             Add New Chapter
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {chapters.map((chapter) => (
//                             <div key={chapter.id} className="bg-white p-6 rounded-lg shadow-lg">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                                     {chapter.order}. {chapter.title}
//                                 </h3>
//                                 <p className="text-gray-700 mb-4">{chapter.content}</p>
//                                 {chapter.video_url && (
//                                     <div className="aspect-w-16 aspect-h-9 mb-4">
//                                         <iframe
//                                             width="100%"
//                                             height="100%"
//                                             src={`https://www.youtube.com/embed/${getYouTubeVideoID(chapter.video_url)}`}
//                                             title="YouTube video player"
//                                             frameBorder="0"
//                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                             allowFullScreen
//                                             className="rounded-md"
//                                         ></iframe>
//                                     </div>
//                                 )}
//                                 <div className="mt-4">
//                                     <input
//                                         type="text"
//                                         name="video_url"
//                                         id=""
//                                         value={editUrl || chapter.video_url}
//                                         onChange={(e) => setEditUrl(e.target.value)}
//                                         className="w-full p-2 border border-gray-300 rounded-md text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                     <button
//                                         className="mt-2 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                                         onClick={() => handleChangeUrl(chapter.id, editUrl)}
//                                     >
//                                         Change URL
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {chapters.length > 0 && (
//                     <div className="flex justify-center mt-6">
//                         <button
//                             className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                             onClick={() => addCourse() }
//                         >
//                             Add More Chapter
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminChapterManagement;
