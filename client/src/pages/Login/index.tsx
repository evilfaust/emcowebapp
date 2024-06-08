import React, { useState } from 'react';
import AuthService from '../../services/authService';
import '../Auth.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    AuthService.login(username, password).then(
      () => {
        window.location.href = '/profile';
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            (error.response.data.non_field_errors 
              ? error.response.data.non_field_errors[0]
              : error.response.data.message)) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Логин</h2>
        <div className="form-group">
          <label>Имя (Username)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-button">Войти</button>
        <a href="/register" className="register-link">Регистрация</a>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default Login;
