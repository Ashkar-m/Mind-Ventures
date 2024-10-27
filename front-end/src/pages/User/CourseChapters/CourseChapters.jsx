import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../components/auth/authService';

const CourseChapters = () => {

    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}/courses/chapter-list/`)
            .then(response => {
                setChapters(response.data);
            })
            .catch(error => {
                console.error('Error fetching the chapters:', error);
            });
    }, []);

     // Improved function to extract YouTube video ID from URL
    const getYouTubeVideoID = (url) => {
        // Regular expression to capture different YouTube URL patterns
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+&v=)|youtu\.be\/)([^&?\/\s]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };
    

  return (
    <div>
            <h2>Chapters List</h2>
            <ul>
                {chapters.map((chapter) => (
                    <li key={chapter.id} style={{ marginBottom: '20px' }}>
                        <h3>{chapter.title}</h3>
                        <p>{chapter.content}</p>
                        {chapter.video_url && (
                            <div>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoID(chapter.video_url)}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default CourseChapters
