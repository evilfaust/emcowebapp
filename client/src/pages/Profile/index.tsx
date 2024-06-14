import React, { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import '../Auth.css';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  const [trashCount, setTrashCount] = useState<number>(0);

  useEffect(() => {
    if (currentUser) {
      AuthService.getTrashCount(currentUser.username)
        .then(count => setTrashCount(count))
        .catch(error => console.error('Error fetching trash count:', error));
    }
  }, [currentUser]);

  const handleResetPassword = () => {
    if (currentUser && currentUser.email) {
      AuthService.resetPassword(currentUser.email)
        .then(() => {
          alert('Инструкция по сбросу пароля отправлена на ваш email.');
        })
        .catch(error => {
          console.error('Ошибка при сбросе пароля:', error);
          alert('Ошибка при сбросе пароля');
        });
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="profile-container">
      <h1>Тут будет профиль</h1>
      {currentUser ? (
        <div className="profile-info">
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Количество убранных свалок:</strong> {trashCount}</p>
          <button onClick={handleResetPassword} className="reset-password-button">Сбросить пароль</button>
          <button onClick={handleLogout} className="logout-button">Выйти</button>
          <Link to="/moderation">
            <button className="moderation-button">Модерация</button>
          </Link>
        </div>
      ) : (
        <p>Сначала логин, потом аккаунт</p>
      )}
    </div>
  );
};

export default Profile;
