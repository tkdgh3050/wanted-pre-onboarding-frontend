import { api } from '../api';
import { JWT_KEY } from '../config';
import {
  ADD_TODO_ACTION_DONE, ADD_TODO_ACTION_ERROR, ADD_TODO_ACTION_LOADING,
  LOAD_TODO_ACTION_DONE, LOAD_TODO_ACTION_ERROR, LOAD_TODO_ACTION_LOADING,
  UPDATE_TODO_ACTION_DONE, UPDATE_TODO_ACTION_ERROR, UPDATE_TODO_ACTION_LOADING,
  REMOVE_TODO_ACTION_DONE, REMOVE_TODO_ACTION_ERROR, REMOVE_TODO_ACTION_LOADING,
} from './types';

// todo 불러오는 action
export async function loadTodos(dispatch) {
  try {
    const accessToken = localStorage.getItem(JWT_KEY); //header 에 인증정보 넣기 위함
    dispatch({ type: LOAD_TODO_ACTION_LOADING });
    const result = await api.getTodos(accessToken);
    dispatch({ type: LOAD_TODO_ACTION_DONE, data: result.data });
  } catch (error) {
    dispatch({ type: LOAD_TODO_ACTION_ERROR, error });
    if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류
      alert(error.response.data.message);
    } else {
      alert('오류가 발생했습니다. 관리자에게 문의하세요.');
    }
    throw error;
  }
}

// todo 추가하는 action
export async function addTodo(dispatch, data) {
  try {
    const accessToken = localStorage.getItem(JWT_KEY); //header 에 인증정보 넣기 위함
    dispatch({ type: ADD_TODO_ACTION_LOADING });
    const result = await api.createTodo(data, accessToken);

    if (result.data) { // 받아온 결과값에 access_token 값이 존재하는 경우
      dispatch({ type: ADD_TODO_ACTION_DONE, data: result.data });
    } else { // 없는 경우 에러 발생
      throw new Error('예기치 못한 오류가 발생했습니다. 관리자에게 문의하세요');
    }
  } catch (error) {
    dispatch({ type: ADD_TODO_ACTION_ERROR, error });
    if ([401, 404].includes(error.response?.status)) { // Unauthorized 오류
      alert(error.response.data.message);
    } else {
      alert('오류가 발생했습니다. 관리자에게 문의하세요.');
    }
    throw error;
  }
}

// todo 수정하는 action
export async function updateTodo(dispatch, id, data) {
  try {
    const accessToken = localStorage.getItem(JWT_KEY); //header 에 인증정보 넣기 위함
    dispatch({ type: UPDATE_TODO_ACTION_LOADING });
    const result = await api.updateTodo(id, data, accessToken);

    if (result.data) { // 받아온 결과값에 access_token 값이 존재하는 경우
      dispatch({ type: UPDATE_TODO_ACTION_DONE, data: result.data });
    } else { // 없는 경우 에러 발생
      throw new Error('예기치 못한 오류가 발생했습니다. 관리자에게 문의하세요');
    }
  } catch (error) {
    dispatch({ type: UPDATE_TODO_ACTION_ERROR, error });
    if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류
      alert(error.response.data.message);
    } else {
      alert('오류가 발생했습니다. 관리자에게 문의하세요.');
    }
    throw error;
  }
}

// todo 제거하는 action
export async function removeTodo(dispatch, id) {
  try {
    const accessToken = localStorage.getItem(JWT_KEY); //header 에 인증정보 넣기 위함
    dispatch({ type: REMOVE_TODO_ACTION_LOADING });
    await api.deleteTodo(id, accessToken);
    dispatch({ type: REMOVE_TODO_ACTION_DONE, data: id });
  } catch (error) {
    dispatch({ type: REMOVE_TODO_ACTION_ERROR, error });
    if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류
      alert(error.response.data.message);
    } else {
      alert('오류가 발생했습니다. 관리자에게 문의하세요.');
    }
    throw error;
  }
}