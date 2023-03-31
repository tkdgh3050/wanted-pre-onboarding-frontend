import axios from 'axios';
import { API_URL } from './config';

axios.defaults.baseURL = API_URL;

export const api = {
  signin: async function (data) {
    return await axios.post(API_URL + '/auth/signin', data);
  },
  signup: async function (data) {
    return await axios.post(API_URL + '/auth/signup', data);
  },
}