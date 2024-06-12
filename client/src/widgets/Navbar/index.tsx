import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { pages } from 'widgets';
import { Item } from './features/item/ui';
import AuthService from 'services/authService';
import logo from 'shared/images/header-logo.png';
import profileIcon from 'shared/images/profile-icon.png'; // Добавьте путь к иконке профиля
import './index.scss';

const handleLogout = () => {
  AuthService.logout();
  window.location.href = '/login'; // Перенаправление после выхода
};

const Navigation: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <header>
      <nav className="navbar">
        <NavLink to={'/'}>
          <img src={logo} alt="logo" />
        </NavLink>
        <ul className="navbar-left">
          {pages.map((page) => (
            <Item key={page.value} label={page.label} link={page.to} value={page.value} />
          ))}
        </ul>
        <ul className="navbar-right">
          {currentUser ? (
            <li className="user-profile">
              <img src={profileIcon} alt="Profile" className="profile-icon" onClick={goToProfile} />
              <span>{currentUser.email}</span>
              <button className="logout-button" onClick={handleLogout}>Выйти</button>
            </li>
          ) : (
            <li>
              <NavLink to={'/login'}>Войти</NavLink>
            </li>
          )}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {pages.map((page) => (
              <li key={page.value}>
                <NavLink to={page.to} onClick={toggleMenu}>{page.label}</NavLink>
              </li>
            ))}
            {currentUser ? (
              <li>
                <NavLink to="/profile" onClick={toggleMenu}>Профиль</NavLink>
                <button onClick={handleLogout}>Выйти</button>
              </li>
            ) : (
              <li>
                <NavLink to="/login" onClick={toggleMenu}>Войти</NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
