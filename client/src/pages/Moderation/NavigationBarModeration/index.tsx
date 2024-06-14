import React from 'react';
import './navigationBarModeration.scss';
import { NavLink } from 'react-router-dom';

const NavigationBarModeration: React.FC = () => {
    return (
        <nav className="navigation-bar-moderation">
            <NavLink to="/moderation/markers">Метки</NavLink>
            <NavLink to="/moderation/reviews">Отзывы</NavLink>
        </nav>
    );
};

export default NavigationBarModeration;
