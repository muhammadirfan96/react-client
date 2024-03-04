import axios from 'axios';

const axiosDefault = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

const axiosAuth = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const date = new Date();
    if (true) {
      config.headers.Authorization = `Bearer`
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axiosDefault, axiosAuth };
