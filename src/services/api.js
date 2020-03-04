import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
  baseURL: 'http://localhost:9090',
  headers: {
    Accept: 'application/json'
  }
});

export default api;
