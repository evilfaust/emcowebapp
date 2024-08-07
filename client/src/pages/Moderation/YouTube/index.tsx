import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './youtube.scss';
import { FiTrash2, FiEdit, FiPlus } from 'react-icons/fi';
import { getCsrfToken } from '../../../services/csrf';

interface YouTubeVideo {
    id: number;
    title: string;
    description: string;
    video_url: string;
    channel: string;
}

const YouTubeModeration: React.FC = () => {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [videoToDelete, setVideoToDelete] = useState<number | null>(null);
    const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null);
    const [addingVideo, setAddingVideo] = useState<YouTubeVideo | null>(null);

    const csrfToken = getCsrfToken();

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get<YouTubeVideo[]>("http://localhost:8000/api/youtube/");
            sortVideos(response.data);
            setLoading(false);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFetchError = (error: any) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            setError(`Ошибка при загрузке видео: ${axiosError.message}`);
        } else if (error instanceof Error) {
            setError(`Ошибка при загрузке видео: ${error.message}`);
        } else {
            setError('Неизвестная ошибка');
        }
    };

    const sortVideos = (data: YouTubeVideo[]) => {
        const sortedVideos = [...data];
        if (sortDirection === 'asc') {
            sortedVideos.sort((a, b) => a.id - b.id);
        } else {
            sortedVideos.sort((a, b) => b.id - a.id);
        }
        setVideos(sortedVideos);
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        sortVideos(videos);
    };

    const confirmDeleteVideo = (id: number) => {
        setVideoToDelete(id);
        setShowModal(true);
    };

    const handleDeleteVideo = async () => {
        if (videoToDelete !== null) {
            try {
                await axios.delete(`http://localhost:8000/api/youtube//api/youtube/${videoToDelete}/`, {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    }
                });
                setVideos(videos.filter(video => video.id !== videoToDelete));
                setShowModal(false);
                setVideoToDelete(null);
            } catch (error) {
                console.error('Ошибка при удалении видео:', error);
            }
        }
    };

    const handleEditVideo = (video: YouTubeVideo) => {
        setEditingVideo(video);
    };

    const handleSaveVideo = async () => {
        if (editingVideo !== null) {
            try {
                await axios.patch(`http://localhost:8000/api/youtube/${editingVideo.id}/`, editingVideo, {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    }
                });
                setVideos(videos.map(video => video.id === editingVideo.id ? editingVideo : video));
                setEditingVideo(null);
            } catch (error) {
                console.error('Ошибка при обновлении видео:', error);
            }
        }
    };

    const handleAddVideo = async () => {
        if (addingVideo !== null) {
            try {
                const response = await axios.post('jurikartiweb.ru/api/youtube/', addingVideo, {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    }
                });
                setVideos([...videos, response.data]);
                setAddingVideo(null);
            } catch (error) {
                console.error('Ошибка при добавлении видео:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editingVideo) {
            setEditingVideo({
                ...editingVideo,
                [e.target.name]: e.target.value
            });
        } else if (addingVideo) {
            setAddingVideo({
                ...addingVideo,
                [e.target.name]: e.target.value
            });
        }
    };

    const filteredVideos = videos.filter(video =>
        video &&
        ((video.title && video.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (video.id && video.id.toString().includes(searchQuery)))
    );

    return (
        <div className="youtube-container">
            <h1>Видео с YouTube</h1>
            <input
                type="text"
                placeholder="Поиск видео по ID или названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <button className="add-button" onClick={() => setAddingVideo({ id: 0, title: '', description: '', video_url: '', channel: '' })}>
                <FiPlus /> Добавить видео
            </button>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <table className="youtube-table">
                        <thead>
                            <tr>
                                <th onClick={toggleSortDirection}>ID {sortDirection === 'asc' ? '▲' : '▼'}</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Канал</th>
                                <th>Видео</th>
                                <th>Редактировать</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVideos.map(video => (
                                <tr key={video.id}>
                                    <td>{video.id}</td>
                                    <td>{video.title}</td>
                                    <td>{video.description}</td>
                                    <td>{video.channel}</td>
                                    <td>
                                        <a href={video.video_url} target="_blank" rel="noopener noreferrer">Ссылка на видео</a>
                                    </td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditVideo(video)}>
                                            <FiEdit />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="delete-button" onClick={() => confirmDeleteVideo(video.id)}>
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <p>Вы уверены, что хотите удалить видео?</p>
                                <div className="modal-buttons">
                                    <button className="confirm" onClick={handleDeleteVideo}>Да</button>
                                    <button className="cancel" onClick={() => setShowModal(false)}>Нет</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {(editingVideo || addingVideo) && (
                        <div className="edit-modal-overlay">
                            <div className="edit-modal">
                                <h2>{addingVideo ? 'Добавить видео' : 'Редактировать видео'}</h2>
                                <label>
                                    Название:
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingVideo ? editingVideo.title : addingVideo ? addingVideo.title : ''}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Описание:
                                    <textarea
                                        name="description"
                                        value={editingVideo ? editingVideo.description : addingVideo ? addingVideo.description : ''}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    URL видео:
                                    <input
                                        type="text"
                                        name="video_url"
                                        value={editingVideo ? editingVideo.video_url : addingVideo ? addingVideo.video_url : ''}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Канал:
                                    <input
                                        type="text"
                                        name="channel"
                                        value={editingVideo ? editingVideo.channel : addingVideo ? addingVideo.channel : ''}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <div className="edit-modal-buttons">
                                    <button className="save" onClick={addingVideo ? handleAddVideo : handleSaveVideo}>{addingVideo ? 'Добавить' : 'Сохранить'}</button>
                                    <button className="cancel" onClick={() => {
                                        setEditingVideo(null);
                                        setAddingVideo(null);
                                    }}>
                                        Отменить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default YouTubeModeration;