import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './reviews.scss';

interface Review {
    id: number;
    text: string;
    phone: string;
    recipient: string;
    user: string | null;
    created_at: string;
    approved: boolean;
}

const ReviewsManagement: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8000/reviews/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                });

                console.log("Response data:", response.data);

                if (Array.isArray(response.data)) {
                    setReviews(response.data);
                } else {
                    setError('Неверный формат данных');
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Ошибка при загрузке отзывов');
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleApprove = async (id: number) => {
        try {
            await axios.patch(`http://localhost:8000/reviews/${id}/`, { approved: true }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            setReviews(reviews.map(review => review.id === id ? { ...review, approved: true } : review));
        } catch (err) {
            console.error(err);
            setError('Ошибка при одобрении отзыва');
        }
    };

    const handleDisapprove = async (id: number) => {
        try {
            await axios.patch(`http://localhost:8000/reviews/${id}/`, { approved: false }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            setReviews(reviews.map(review => review.id === id ? { ...review, approved: false } : review));
        } catch (err) {
            console.error(err);
            setError('Ошибка при отмене одобрения отзыва');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/reviews/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            setReviews(reviews.filter(review => review.id !== id));
        } catch (err) {
            console.error(err);
            setError('Ошибка при удалении отзыва');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="reviews-management-page">
            <h1>Отзывы</h1>
            <table className="reviews-management-table">
                <thead>
                    <tr>
                        <th>Пользователь</th>
                        <th>Отзыв</th>
                        <th>Телефон</th>
                        <th>Адресат</th>
                        <th>Дата</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id}>
                            <td>{review.user ? review.user : 'Неизвестный'}</td>
                            <td className="content-cell"><div className="content">{review.text}</div></td>
                            <td>{review.phone}</td>
                            <td><div className="recipient">{review.recipient}</div></td>
                            <td>{new Date(review.created_at).toLocaleDateString()}</td>
                            <td>
                                {review.approved ? (
                                    <button className="reviews-management-button reviews-management-cancel-button" onClick={() => handleDisapprove(review.id)}>Отменить</button>
                                ) : (
                                    <button className="reviews-management-button reviews-management-approve-button" onClick={() => handleApprove(review.id)}>Одобрить</button>
                                )}
                                <button className="reviews-management-button reviews-management-button-delete" onClick={() => handleDelete(review.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewsManagement;
