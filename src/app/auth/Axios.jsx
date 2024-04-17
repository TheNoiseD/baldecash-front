import axios from 'axios';

const baseURL = 'http://localhost/api/'

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const instance = axios.create({
  baseURL,
  headers: {
        ...getAuthorizationHeader(),
        'Content-Type': 'application/json',
    }
});

export default instance;