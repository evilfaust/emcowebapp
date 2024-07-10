import React from 'react';
import './VideoGallery.scss';

const VideoGallery: React.FC = () => {
  const videos = [
    { id: 'dQw4w9WgXcQ', description: 'Описание видео 1' },
    { id: '3JZ_D3ELwOQ', description: 'Описание видео 2' },
    { id: 'L_jWHffIx5E', description: 'Описание видео 3' },
    { id: '2Vv-BfVoq4g', description: 'Описание видео 4' },
    { id: 'lIxPHLLalEM', description: 'Описание видео 5' },
  ];
  //работа с id вставляете код с ссылки видео ютуба находится после watch?v=####

  return (
    <div className="video-gallery">
      <div className="videos-container">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={`YouTube video player - ${video.description}`}
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
