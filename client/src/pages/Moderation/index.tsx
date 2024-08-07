import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Markers from './Markers';
import Reviews from './Reviews';
import NavigationBarModeration from './NavigationBarModeration';
import YouTubeModeration from './YouTube';
import ModerationNews from './News/ModerationNews';
import NewsEdit from './News/NewsEdit';
import NewsCreate from './News/NewsCreate';
import TruckComplaintsModeration from './TruckComplaints';
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
                    <Route path="news" element={<ModerationNews />} /> 
                    <Route path="news/create" element={<NewsCreate />} /> 
                    <Route path="news/:id/edit" element={<NewsEdit />} /> 
                    <Route path="truck-complaints" element={<TruckComplaintsModeration />} />
                    <Route path="*" element={<h1>Модерация</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default Moderation;
