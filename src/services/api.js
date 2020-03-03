import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
  baseURL: 'https://api.geolocation.girojundiai.com.br',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
