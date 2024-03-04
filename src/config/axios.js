import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setExpire, setUsername } from '../redux/tokenSlice.js';
import { setNotification } from '../redux/notificationSlice.js';
import { jwtDecode } from 'jwt-decode';

const axiosDefault = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

const axiosRefreshToken = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});
axiosRefreshToken.interceptors.request.use(
  async config => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.jwToken.token);
    const expire = useSelector(state => state.jwToken.expire);
    const username = useSelector(state => state.jwToken.username);

    
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
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axiosRT.interceptors.request.use(
//   async config => {
//     try {
//       const crrDate = new Date();
//       if (expire * 1000 < crrDate.getTime()) {
//         const response = await axiosDefault.get('/refresh-token');
//         dispatch(setToken(response.data));
//         config.headers.Authorization = `Bearer ${response.data}`;
//       } else {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     } catch (e) {
//       const arrError = e.response.data.error.split(',');
//       //setNotification({ message: arrError });
//     }
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export { axiosDefault, axiosRefreshToken };
