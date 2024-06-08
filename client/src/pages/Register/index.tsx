import React, { useState } from 'react';
import AuthService from '../../services/authService';
import '../Auth.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    AuthService.register(username, email, password).then(
      () => {
        setMessage('User registered successfully!');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Регистрация</h2>
        <div className="form-group">
          <label>Имя(Username) </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Пароль </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-button">Зарегестрироваться</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Register;
