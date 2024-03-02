import axios from 'axios';

const axiosDefault = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

export { axiosDefault };
