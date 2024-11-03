// import React, { useEffect, useState } from 'react';
// import MentorNavbar from '../Navbar/Navbar';
// import MentorSidebar from '../Sidebar/Sidebar'
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { baseUrl } from '../../../components/auth/authService';
// import axiosInstance from '../../../components/Bearer/axiosInterceptor';

// const Chapter = () => {


//     const [chapters, setChapters] = useState([]);
//     const { id } = useParams();
//     const { accessToken } = useSelector( (state) => state.auth);

//     useEffect(() => {
//         const fetchChaptersList = async () => {
//             try {
//                 const response = await axiosInstance.get(`${baseUrl}/courses/chapter-list/${id}/`, {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`, // Ensure valid accessToken is used
//                     },
//                 });

//                 setChapters(response.data);
//             } catch (error) {
//                 console.error('Error while fetching chapters:', error.message);
                
//             }
//         }
//         fetchChaptersList();
//     },[])

//     console.log(chapters);

//     // function to extract YouTube video ID from URL
//     const getYouTubeVideoID = (url) => {
//         // Regular expression to capture different YouTube URL patterns
//         const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+&v=)|youtu\.be\/)([^&?\/\s]+)/;
//         const match = url.match(regex);
//         return match ? match[1] : null;
//     };
    
    

//   return (
//     <div>

//         <MentorNavbar />

//         <MentorSidebar />

//         <div className="p-8 sm:ml-64 bg-gray-50 min-h-screen">

//         <h2>Chapters List</h2>
//             <ul>
//                 {chapters.map((chapter) => (
//                     <li key={chapter.id} style={{ marginBottom: '20px' }}>
//                         <h3>{chapter.title}</h3>
//                         <p>{chapter.content}</p>
//                         {chapter.video_url && (
//                             <div>
//                                 <iframe
//                                     width="560"
//                                     height="315"
//                                     src={`https://www.youtube.com/embed/${getYouTubeVideoID(chapter.video_url)}`}
//                                     title="YouTube video player"
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 ></iframe>
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>
       
//         </div>
      
//     </div>
//   )
// }

// export default Chapter


import React, { useEffect, useState } from 'react';
import MentorNavbar from '../Navbar/Navbar';
import MentorSidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../components/auth/authService';
import axiosInstance from '../../../components/Bearer/axiosInterceptor';

const Chapter = () => {
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
            <MentorNavbar />
            <MentorSidebar />

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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chapter;
