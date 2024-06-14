import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './markers.scss';
import { FiTrash2, FiArrowUpCircle } from 'react-icons/fi'; // Импортируем иконки из react-icons

interface Marker {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    photo: string;
    aftephoto: string; // ИМЕННО AFTEPHOTO, НЕ ИСПРАВЛЯТЬ
    is_active: boolean;
}

const MarkersModeration: React.FC = () => {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [markerToDelete, setMarkerToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetchMarkers();
    }, []);

    const fetchMarkers = async () => {
        try {
            const response = await axios.get<Marker[]>("http://127.0.0.1:8000/marker/");
            sortMarkers(response.data);
            setLoading(false);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFetchError = (error: any) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            setError(`Ошибка при загрузке меток: ${axiosError.message}`);
        } else if (error instanceof Error) {
            setError(`Ошибка при загрузке меток: ${error.message}`);
        } else {
            setError('Неизвестная ошибка');
        }
    };

    const sortMarkers = (data: Marker[]) => {
        const sortedMarkers = [...data];
        if (sortDirection === 'asc') {
            sortedMarkers.sort((a, b) => a.id - b.id);
        } else {
            sortedMarkers.sort((a, b) => b.id - a.id);
        }
        setMarkers(sortedMarkers);
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        sortMarkers(markers);
    };

    const confirmDeleteMarker = (id: number) => {
        setMarkerToDelete(id);
        setShowModal(true);
    };

    const handleDeleteMarker = async () => {
        if (markerToDelete !== null) {
            try {
                await axios.delete(`/api/markers/${markerToDelete}/`);
                setMarkers(markers.filter(marker => marker.id !== markerToDelete));
                setShowModal(false);
                setMarkerToDelete(null);
            } catch (error) {
                console.error('Ошибка при удалении метки:', error);
            }
        }
    };

    const handleToggleActive = async (id: number, currentActive: boolean) => {
        try {
            const updatedMarkers = markers.map(marker =>
                marker.id === id ? { ...marker, is_active: !currentActive } : marker
            );
            setMarkers(updatedMarkers);
            await axios.patch(`/api/markers/${id}/`, { is_active: !currentActive });
        } catch (error) {
            console.error('Ошибка при обновлении активности метки:', error);
        }
    };

    const filteredMarkers = markers.filter(marker =>
        marker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        marker.id.toString().includes(searchQuery)
    );

    const handleGoToMarker = (latitude: number, longitude: number) => {
        const mapUrl = `/map?latitude=${latitude}&longitude=${longitude}`;
        window.location.href = mapUrl;
    };

    return (
        <div className="markers-container">
            <h1>Метки на карте</h1>
            <input
                type="text"
                placeholder="Поиск меток по ID или названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <table className="markers-table">
                        <thead>
                            <tr>
                                <th onClick={toggleSortDirection}>ID {sortDirection === 'asc' ? '▲' : '▼'}</th>
                                <th style={{ width: '120px' }}>Название</th> {/* Уменьшили ширину столбца "Название" */}
                                <th>Описание</th>
                                <th>Координаты</th>
                                <th>Фото</th>
                                <th>Фото после</th> {/* Добавили столбец "Фото после" */}
                                <th>Убрана</th>
                                <th>Удалить</th>
                                <th>Перейти к метке</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMarkers.map(marker => (
                                <tr key={marker.id}>
                                    <td>{marker.id}</td>
                                    <td>{marker.name}</td>
                                    <td>{marker.description}</td>
                                    <td>{marker.latitude}, {marker.longitude}</td>
                                    <td>
                                        {marker.photo ? (
                                            <a href={`http://localhost:8000/${marker.photo}`} target="_blank" rel="noopener noreferrer">Ссылка на фото</a>
                                        ) : (
                                            <span style={{ color: '#ccc' }}>Нет фото</span>
                                        )}
                                    </td>
                                    <td>
                                        {marker.aftephoto ? (
                                            <a href={`http://localhost:8000/${marker.aftephoto}`} target="_blank" rel="noopener noreferrer">Ссылка на фото</a>
                                        ) : (
                                            <span style={{ color: '#ccc' }}>Нет фото</span>
                                        )}
                                    </td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={marker.is_active}
                                                onChange={() => handleToggleActive(marker.id, marker.is_active)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button className="delete-button" onClick={() => confirmDeleteMarker(marker.id)}>
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="go-to-button" onClick={() => handleGoToMarker(marker.latitude, marker.longitude)}>
                                            <FiArrowUpCircle />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <p>Вы уверены, что хотите удалить метку?</p>
                                <div className="modal-buttons">
                                    <button className="confirm" onClick={handleDeleteMarker}>Да</button>
                                    <button className="cancel" onClick={() => setShowModal(false)}>Нет</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MarkersModeration;
