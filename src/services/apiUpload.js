import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
  baseURL: 'http://192.168.15.43:9090',
  headers: {
    'content-type': 'multipart/form-data'
  }
});

export default api;
