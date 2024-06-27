import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useNotification } from 'shared/notifications/NotificationContext';
import { pages } from 'widgets';
import { Item } from './features/item/ui';
import AuthService from 'services/authService';
import logo from 'shared/images/header-logo.png';
import profileIcon from 'shared/images/profile-icon.png';
import './index.scss';

const handleLogout = () => {
  AuthService.logout();
  window.location.href = '/login'; // Перенаправление после выхода
};

const Navigation: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const { notifications, markAsRead } = useNotification();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationItemClick = (id: string) => {
    markAsRead(id);
    handleNotificationClose();
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <header>
      <AppBar position="static">
        <Toolbar className="navbar">
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
                <IconButton color="inherit" onClick={handleNotificationClick}>
                  <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsIcon style={{ color: unreadCount > 0 ? '#ff5722' : '#000' }} />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleNotificationClose}
                >
                  {notifications.map((notification) => (
                    <MenuItem key={notification.id} onClick={() => handleNotificationItemClick(notification.id)}>
                      <ListItemIcon>
                        <MarkEmailUnreadIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={notification.message} />
                    </MenuItem>
                  ))}
                </Menu>
                <button className="logout-button" onClick={handleLogout}>Выйти</button>
              </li>
            ) : (
              <li>
                <NavLink to={'/login'}>Войти</NavLink>
              </li>
            )}
          </ul>
          <div className="navbar-mobile-icons">
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={unreadCount} color="secondary">
                <NotificationsIcon style={{ color: unreadCount > 0 ? '#ff5722' : '#000' }} />
              </Badge>
            </IconButton>
            <div className="hamburger" onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
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
