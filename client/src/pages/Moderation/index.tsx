import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Markers from './Markers';
import Reviews from './Reviews';
import NavigationBarModeration from './NavigationBarModeration';
import YouTubeModeration from './YouTube';
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
                    <Route path="*" element={<h1>Модерация</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default Moderation;
