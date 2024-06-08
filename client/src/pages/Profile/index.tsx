import React from 'react';
import AuthService from '../../services/authService';
import '../Auth.css';

const Profile: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="profile-container">
      <h1>Тут будет профиль</h1>
      {currentUser ? (
        <div className="profile-info">
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      ) : (
        <p>Сначала логин, потом аккаунт</p>
      )}
    </div>
  );
};

export default Profile;
