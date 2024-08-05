import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Markers from './Markers';
import Reviews from './Reviews';
import NavigationBarModeration from './NavigationBarModeration';
import YouTubeModeration from './YouTube';
import ModerationNews from './News/ModerationNews';
import NewsEdit from './News/NewsEdit'; // Импортируем правильный компонент
import './moderation.scss';

const Moderation: React.FC = () => {
    return (
        <div className="moderation-container">
            <NavigationBarModeration />
            <div className="moderation-content">
                <Routes>
                    <Route path="markers" element={<Markers />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="youtube" element={<YouTubeModeration />} />
                    <Route path="news" element={<ModerationNews />} /> {/* Новый маршрут для новостей */}
                    <Route path="news/:id/edit" element={<NewsEdit />} /> {/* Маршрут для редактирования новостей */}
                    <Route path="*" element={<h1>Модерация</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default Moderation;
