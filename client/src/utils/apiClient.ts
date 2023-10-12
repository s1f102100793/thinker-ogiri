import aspida from '@aspida/axios';
import api from 'api/$api';
import axios from 'axios';

export const apiClient = api(
  aspida(
    axios.create({
      baseURL: 'https://thinker-ogiri-7be19019c02a.herokuapp.com',
      withCredentials: true,
    })
  )
);
