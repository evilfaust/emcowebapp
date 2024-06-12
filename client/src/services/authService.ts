import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

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
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
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
  getTrashCount,
  resetPassword,
};
