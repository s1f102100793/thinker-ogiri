import aspida from '@aspida/axios';
import api from 'api/$api';
import axios from 'axios';

export const apiClient = api(
  aspida(axios.create({ baseURL: process.env.API_ENDPOINT, withCredentials: true }))
);
