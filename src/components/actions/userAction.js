import { api } from '../api';
import { JWT_KEY } from '../config';
import {
  SIGNIN_ACTION_DONE, SIGNIN_ACTION_ERROR, SIGNIN_ACTION_LOADING,
  SIGNUP_ACTION_DONE, SIGNUP_ACTION_ERROR, SIGNUP_ACTION_LOADING,
} from './types';

// 로그인 진행
export async function signinUser(dispatch, data) {
  dispatch({ type: SIGNIN_ACTION_LOADING });
  try {
    const result = await api.signin(data);

    if (result.data?.access_token) { // 받아온 결과값에 access_token 값이 존재하는 경우
      localStorage.clear();
      localStorage.setItem(JWT_KEY, result.data.access_token);
      dispatch({ type: SIGNIN_ACTION_DONE });
      alert('환영합니다!');
    } else { // 없는 경우 에러 발생
      throw new Error('예기치 못한 오류가 발생했습니다. 관리자에게 문의하세요');
    }
  } catch (error) {
    dispatch({ type: SIGNIN_ACTION_ERROR, error });
    if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류
      alert(error.response.data.message);
    } else {
      alert('오류가 발생했습니다. 관리자에게 문의하세요.');
    }
    throw error;
  }
}

export async function signupUser(dispatch, data) {
  dispatch({ type: SIGNUP_ACTION_LOADING });
  try {
    await api.signup(data);
    dispatch({ type: SIGNUP_ACTION_DONE });
    alert('회원가입에 성공했습니다.');
  } catch (error) {
    dispatch({ type: SIGNUP_ACTION_ERROR, error });
    if (error?.response.status === 400) { // Bad Request 오류 - 이메일 중복
      alert(error.response.data.message);
    } else {
      alert('오류가 발생했습니다. 관리자에게 문의하세요.');
    }
    throw error;
  }
}