import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBarModeration.scss';

const NavigationBarModeration: React.FC = () => {
    return (
        <nav className="navigation-bar-moderation">
            <NavLink 
                to="/moderation/markers" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Метки
            </NavLink>
            <NavLink 
                to="/moderation/reviews" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Отзывы
            </NavLink>
            <NavLink 
                to="/moderation/youtube" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                YouTube
            </NavLink>
            <NavLink 
                to="/moderation/news" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Новости
            </NavLink>
        </nav>
    );
};

export default NavigationBarModeration;
