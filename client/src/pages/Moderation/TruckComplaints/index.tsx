import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import './truckComplaints.scss';

interface TruckComplaint {
    id: number;
    truck_number: string;
    date_time: string;
    media: string;
    complaint_text: string; // Добавляем поле complaint_text
    user_email: string | null; // Добавляем user_email
}

const TruckComplaintsModeration: React.FC = () => {
    const [complaints, setComplaints] = useState<TruckComplaint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get<TruckComplaint[]>('http://localhost:8000/api/truck-complaints/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            });
            sortComplaints(response.data);
            setLoading(false);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFetchError = (error: any) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            setError(`Ошибка при загрузке жалоб: ${axiosError.message}`);
        } else if (error instanceof Error) {
            setError(`Ошибка при загрузке жалоб: ${error.message}`);
        } else {
            setError('Неизвестная ошибка');
        }
    };

    const sortComplaints = (data: TruckComplaint[]) => {
        const sortedComplaints = [...data];
        if (sortDirection === 'asc') {
            sortedComplaints.sort((a, b) => a.id - b.id);
        } else {
            sortedComplaints.sort((a, b) => b.id - a.id);
        }
        setComplaints(sortedComplaints);
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        sortComplaints(complaints);
    };

    const filteredComplaints = complaints.filter(complaint =>
        complaint.truck_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.id.toString().includes(searchQuery)
    );

    return (
        <div className="complaints-container">
            <h1>Жалобы на грузовики</h1>
            <input
                type="text"
                placeholder="Поиск жалоб по ID или номеру грузовика..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th onClick={toggleSortDirection}>ID {sortDirection === 'asc' ? '▲' : '▼'}</th>
                            <th>Номер грузовика</th>
                            <th>Дата и время</th>
                            <th>Медиа</th>
                            <th>Текст жалобы</th>
                            <th>Почта</th> {/* Оставляем столбец для почты */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComplaints.map(complaint => (
                            <tr key={complaint.id}>
                                <td>{complaint.id}</td>
                                <td>{complaint.truck_number}</td>
                                <td>{complaint.date_time}</td>
                                <td>
                                    {complaint.media ? (
                                        <a href={`http://localhost:8000/media/${complaint.media}`} target="_blank" rel="noopener noreferrer">Ссылка на медиа</a>
                                    ) : (
                                        <span style={{ color: '#ccc' }}>Нет медиа</span>
                                    )}
                                </td>
                                <td>{complaint.complaint_text}</td> {/* Отображаем текст жалобы */}
                                <td>{complaint.user_email ?? 'Анонимно'}</td> {/* Обновляем отображение почты */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TruckComplaintsModeration;
