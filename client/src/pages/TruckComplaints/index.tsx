import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.scss';
import { getCsrfToken } from '../../services/csrf'; // Импортируем функцию для получения CSRF-токена

const TruckComplaints: React.FC = () => {
    const [truckNumber, setTruckNumber] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [complaintText, setComplaintText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showNotice, setShowNotice] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotice(false);
        }, 10000); // 10 секунд

        return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true); // Делаем кнопку неактивной при нажатии
        setErrorMessage(null); // Сброс сообщения об ошибке

        const formData = new FormData();
        formData.append('truck_number', truckNumber);
        formData.append('date_time', dateTime);
        formData.append('complaint_text', complaintText);
        if (media) {
            formData.append('media', media);
        }

        try {
            const csrfToken = getCsrfToken();
            const accessToken = localStorage.getItem('access');
            const headers: { [key: string]: string } = {
                'Content-Type': 'multipart/form-data',
            };
            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            }
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const response = await axios.post('http://localhost:8000/api/truck-complaints/', formData, {
                headers: headers,
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error during form submission:', error);
            setErrorMessage('Ошибка при отправке жалобы');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReload = () => {
        setIsSubmitted(false);
        setTruckNumber('');
        setDateTime('');
        setComplaintText('');
        setMedia(null);
    };

    return (
        <div className="complaint-container">
            {showNotice && (
                <div className="notice">
                    Если вы хотите обратную связь, то зарегистрируйтесь.
                </div>
            )}
            <h1>Вежливый грузовик</h1>
            <p>
                Если Вы стали свидетелем нарушения на дорогах со стороны грузовиков в Углегорском районе, нарушения ими ПДД: парковка во дворах, парковка на газонах, проезд по улицам населенных пунктов и других случаев неподобающего поведения водителей – то вы попали по адресу!
            </p>
            <p>
                Опишите здесь нарушение:
            </p>
            <ul>
                <li>✔️Укажите государственный номер грузовика</li>
                <li>✔️Укажите время и дату</li>
                <li>✔️Обязательно приложите фотографию или видео нарушения, на котором ВИДЕН госномер нарушителя</li>
            </ul>
            <p>
                Мы обязательно разберёмся в ситуации!
            </p>
            <form onSubmit={handleSubmit} className="complaint-form">
                <label>
                    Государственный номер грузовика:
                    <input 
                        type="text" 
                        value={truckNumber} 
                        onChange={(e) => setTruckNumber(e.target.value)} 
                        required 
                        disabled={isSubmitted}
                    />
                </label>
                <label>
                    Время и дата:
                    <input 
                        type="datetime-local" 
                        value={dateTime} 
                        onChange={(e) => setDateTime(e.target.value)} 
                        required 
                        disabled={isSubmitted}
                    />
                </label>
                <label>
                    Текст жалобы:
                    <textarea 
                        value={complaintText} 
                        onChange={(e) => setComplaintText(e.target.value)} 
                        required 
                        disabled={isSubmitted}
                    />
                </label>
                <label>
                    Фотография или видео нарушения:
                    <input 
                        type="file" 
                        accept="image/*,video/*" 
                        onChange={(e) => setMedia(e.target.files ? e.target.files[0] : null)} 
                        required 
                        disabled={isSubmitted}
                    />
                </label>
                <button type="submit" disabled={isSubmitting || isSubmitted} style={{ backgroundColor: isSubmitting || isSubmitted ? '#ccc' : '#007bff' }}>
                    {isSubmitting ? 'Отправка...' : (isSubmitted ? 'Жалоба отправлена' : 'Отправить')}
                </button>
                {isSubmitted && (
                    <button type="button" onClick={handleReload} style={{ backgroundColor: '#007bff', color: 'white', marginTop: '10px' }}>
                        Отправить жалобу заново
                    </button>
                )}
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default TruckComplaints;
