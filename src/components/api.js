import axios from 'axios';
import { API_URL } from './config';

axios.defaults.baseURL = API_URL;

export const api = {  // API 목록 모아둔 객체
  signin: async function (data) { // 로그인
    return await axios.post(API_URL + '/auth/signin', data);
  },
  signup: async function (data) { // 회원가입
    return await axios.post(API_URL + '/auth/signup', data);
  },
  createTodo: async function (data, accessToken) {  // todo 추가
    return await axios.post(API_URL + '/todos', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },
  getTodos: async function (accessToken) {  // todo 불러오기
    return await axios.get(API_URL + '/todos', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },
  updateTodo: async function (id, data, accessToken) {  // todo 수정
    return await axios.put(API_URL + `/todos/${id || ''}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },
  deleteTodo: async function (id, accessToken) {  // todo 삭제
    return await axios.delete(API_URL + `/todos/${id || ''}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}