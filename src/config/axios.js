import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setExpire, setUsername } from '../redux/tokenSlice.js';
import { setNotification } from '../redux/notificationSlice.js';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const axiosDefault = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

const axiosRT = (token, expire, dispatch) => {
  const axiosInterceptors = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
  });

  axiosInterceptors.interceptors.request.use(
    async config => {
      try {
        const date = new Date();
        if (expire * 1000 < date.getTime()) {
          const response = await axiosDefault.get('/refresh-token');
          config.headers.Authorization = `Bearer ${response.data}`;

          const decoded = jwtDecode(response.data);
          dispatch(setToken(response.data));
          dispatch(setExpire(decoded.exp));
          dispatch(setUsername(decoded.email));
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        const arrError = e.response.data.error.split(',');
        dispatch(
          setNotification({ message: arrError, background: 'bg-red-100' })
        );
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return axiosInterceptors;
};

export { axiosDefault, axiosRT };
