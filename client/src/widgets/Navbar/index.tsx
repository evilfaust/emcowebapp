import React from 'react';
import { NavLink } from 'react-router-dom';
import { pages } from 'widgets';
import { Item } from './features/item/ui';
import AuthService from 'services/authService';
import logo from 'shared/images/header-logo.png';
import './index.scss';


const handleLogout = () => {
  AuthService.logout();
  // После выхода можешь перенаправить пользователя, например, на страницу входа
  window.location.href = '/login';
};

const Navigation: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

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
              <span>{currentUser.email}</span>
              <button className="logout-button" onClick={handleLogout}>Выйти</button>
            </li>
          ) : (
            <li>
              <NavLink to={'/login'}>Войти </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
