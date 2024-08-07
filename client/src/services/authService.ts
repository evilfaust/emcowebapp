import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

interface User {
  username: string;
  email: string;
  is_staff: boolean;
}

const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + 'register/', {
    username,
    email,
    password,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + 'login/', { username, password })
    .then((response) => {
      if (response.data.access && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('access', response.data.access); // Сохраняем токен доступа в localStorage
      }
      return response.data;
    })
    .catch((error) => {
      let message = "An error occurred";
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (typeof data === 'string') {
          message = data;
        } else if (data.detail) {
          message = data.detail;
        } else if (data.non_field_errors) {
          message = data.non_field_errors.join(', ');
        } else {
          message = Object.values(data).join(', ');
        }
      }
      throw new Error(message);
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('access'); // Удаляем токен доступа при выходе
};

const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const getUserInfo = async (): Promise<User | null> => {
  const access = localStorage.getItem('access');
  if (!access) return null;

  try {
    const response = await axios.get(API_URL + 'current_user/', {
      headers: {
        Authorization: `Bearer ${access}`, // Используем токен доступа для запроса
      },
    });
    const userInfo: User = {
      username: response.data.username,
      email: response.data.email,
      is_staff: response.data.is_staff,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    return userInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

const getTrashCount = async (username: string): Promise<number> => {
  try {
    const response = await axios.get(API_URL + `users/${username}/trash-count/`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching trash count:', error);
    return 0; // Или обработать ошибку другим способом
  }
};

const resetPassword = async (email: string): Promise<void> => {
  try {
    await axios.post(API_URL + 'reset-password/', { email });
  } catch (error) {
    console.error('Error resetting password:', error);
    throw new Error('Error resetting password');
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getUserInfo,
  getTrashCount,
  resetPassword,
};
