import React, { useEffect, useState } from 'react';
import './VideoGallery.scss';
import { getCsrfToken } from '../../services/csrf'; // Импорт функции для получения CSRF-токена

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  channel: string;
}

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const csrfToken = getCsrfToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
      }

      try {
        const response = await fetch('http://localhost:8000/api/youtube/', {
          method: 'GET',
          headers: headers,
          credentials: 'include', // Включение учетных данных
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-gallery">
      <div className="videos-container">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.video_url.split('v=')[1]}`}
              title={`YouTube video player - ${video.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
