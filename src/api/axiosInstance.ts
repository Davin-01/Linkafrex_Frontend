import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../utils/logout';

const baseURL = 'https://linkafrex.onrender.com/api/v1';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh');

  if (!token) return req;

  const decoded: any = jwtDecode(token);
  const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }

  try {
    const res = await axios.post(`${baseURL}/auth/token/refresh/`, {
      refresh: refreshToken,
    });

    localStorage.setItem('token', res.data.access);
    req.headers.Authorization = `Bearer ${res.data.access}`;
  } catch (err) {
    logout();
  }

  return req;
});

export default axiosInstance;
