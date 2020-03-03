import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
  baseURL: 'https://api.geolocation.girojundiai.com.br',
  headers: {
    'content-type': 'multipart/form-data'
  }
});

export default api;
