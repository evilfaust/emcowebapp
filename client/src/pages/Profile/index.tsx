import React, { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import '../Auth.css';
import { Link } from 'react-router-dom';

interface User {
  username: string;
  email: string;
  is_staff: boolean;
}

const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [trashCount, setTrashCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await AuthService.getUserInfo();
      if (userInfo) {
        setCurrentUser(userInfo);
        try {
          const count = await AuthService.getTrashCount(userInfo.username);
          setTrashCount(count);
        } catch (error) {
          console.error('Error fetching trash count:', error);
        }
      }
    };

    fetchUserData();
  }, []);

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
          {currentUser.is_staff && (<p><strong>Статус администратора:</strong> {currentUser.is_staff ? 'Да' : 'Нет'}</p>)}
          <button onClick={handleResetPassword} className="reset-password-button">Сбросить пароль</button>
          <button onClick={handleLogout} className="logout-button2">Выйти</button>
          {currentUser.is_staff && (
            <Link to="/moderation">
              <button className="moderation-button">Модерация</button>
            </Link>
          )}
        </div>
      ) : (
        <p>Сначала войдите в аккаунт</p>
      )}
    </div>
  );
};

export default Profile;
