import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
  baseURL: 'http://192.168.15.43:9090',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
