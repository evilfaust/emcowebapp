import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useNotification, Notification } from '../../shared/notifications/NotificationContext';
import { pages } from '../../widgets';
import { Item } from './features/item/ui';
import AuthService from '../../services/authService';
import logo from '../../shared/images/header-logo.png';
import profileIcon from '../../shared/images/profile-icon.png';
import './index.scss';
import { getCsrfToken } from '../../services/csrf'; // Импортируем функцию для получения CSRF-токена

const handleLogout = () => {
  AuthService.logout();
  window.location.href = '/login';
};

const Navigation: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  const { notifications, markAsRead, addNotification } = useNotification();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch('https://jurikartiweb.ru:8000/api/notification/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        credentials: 'include', // Важно для отправки куки
      });
      if (response.ok) {
        const data: Notification[] = await response.json();
        data.forEach(notification => addNotification(notification));
      } else {
        console.error('Error loading notifications:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error loading notifications:', error.message);
    }
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const handleNotificationItemClick = async (id: string) => {
    const csrfToken = getCsrfToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    };
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }

    try {
      await fetch(`https://jurikartiweb.ru:8000/api/notification/${id}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ read: true }),
        credentials: 'include', // Важно для отправки куки
      });
      markAsRead(id);
      handleNotificationClose();
    } catch (error: any) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleMobileNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  };

  return (
    <header>
      <AppBar position="fixed" className="navbar">
        <Toolbar>
          <NavLink to={'/'}>
            <img src={logo} alt="logo" />
          </NavLink>
          <ul className="navbar-left">
            {pages.map((page) => (
              <Item key={page.value} label={page.label} link={page.to} value={page.value} />
            ))}
            <li>
              <NavLink to="/video-gallery">Видеогалерея</NavLink>
            </li>
            <li>
              <NavLink to="/truck-complaints">Жалобы на водителей грузовика</NavLink>
            </li>
          </ul>
          <ul className="navbar-right">
            {currentUser ? (
              <li className="user-profile">
                <img src={profileIcon} alt="Profile" className="profile-icon" onClick={goToProfile} />
                <span>{currentUser.email}</span>
                <IconButton color="inherit" onClick={handleNotificationClick} className="desktop-notification">
                  <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsIcon style={{ color: unreadCount > 0 ? '#ff5722' : '#000' }} />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleNotificationClose}
                >
                  {notifications.length === 0 ? (
                    <MenuItem>
                      <ListItemText primary="Empty" />
                    </MenuItem>
                  ) : (
                    notifications.map((notification) => (
                      <MenuItem key={notification.id} onClick={() => handleNotificationItemClick(notification.id.toString())}>
                        <ListItemIcon>
                          <MarkEmailUnreadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={notification.message} />
                      </MenuItem>
                    ))
                  )}
                </Menu>
                <button className="logout-button" onClick={handleLogout}>Выйти</button>
              </li>
            ) : (
              <li>
                <NavLink to={'/login'}>Логин</NavLink>
              </li>
            )}
          </ul>
          <IconButton color="inherit" onClick={handleMobileNotificationClick} className="mobile-notification">
            <Badge badgeContent={unreadCount} color="secondary">
              <NotificationsIcon style={{ color: unreadCount > 0 ? '#ff5722' : '#000' }} />
            </Badge>
          </IconButton>
          <div className="hamburger" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <IconButton color="inherit" onClick={handleMobileNotificationClick} className="mobile-notification">
            <Badge badgeContent={unreadCount} color="secondary">
              <NotificationsIcon style={{ color: unreadCount > 0 ? '#ff5722' : '#000' }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {mobileMenuOpen && (
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {pages.map((page) => (
              <li key={page.value}>
                <NavLink to={page.to} onClick={toggleMenu}>{page.label}</NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/video-gallery" onClick={toggleMenu}>Видеогалерея</NavLink>
            </li>
            {currentUser ? (
              <>
                <li>
                  <NavLink to="/profile" onClick={toggleMenu}>Профиль</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Выйти</button>
                </li>
              </>
            ) : (
              <li className="auth-buttons">
                <NavLink to="/login" onClick={toggleMenu}>Логин</NavLink>
                <NavLink to="/register" onClick={toggleMenu}>Регистрация</NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
      <Menu
        anchorEl={mobileAnchorEl}
        open={Boolean(mobileAnchorEl)}
        onClose={handleNotificationClose}
      >
        {notifications.length === 0 ? (
          <MenuItem>
            <ListItemText primary="Empty" />
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={() => handleNotificationItemClick(notification.id.toString())}>
              <ListItemIcon>
                <MarkEmailUnreadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={notification.message} />
            </MenuItem>
          ))
        )}
      </Menu>
    </header>
  );
};

export default Navigation;
