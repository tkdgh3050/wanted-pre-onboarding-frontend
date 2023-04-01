import { createContext } from 'react';
import { JWT_KEY } from '../config';
import {
  SIGNIN_ACTION_DONE, SIGNIN_ACTION_ERROR, SIGNIN_ACTION_LOADING,
  SIGNUP_ACTION_DONE, SIGNUP_ACTION_ERROR, SIGNUP_ACTION_LOADING,
  LOGOUT_ACTION,
} from '../actions/types';

export const UserContext = createContext();

export const userInitialState = {
  isLogin: localStorage.getItem(JWT_KEY) ? true : false,
  signinLoading: false,
  signinDone: false,
  signinError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case SIGNIN_ACTION_LOADING: {
      return {
        ...state,
        signinLoading: true,
        signinDone: false,
        signinError: null,
      }
    }
    case SIGNIN_ACTION_DONE: {
      return {
        ...state,
        signinLoading: false,
        signinDone: true,
        isLogin: true,
      }
    }
    case SIGNIN_ACTION_ERROR: {
      return {
        ...state,
        signinLoading: false,
        signinError: action.error,
      }
    }
    case SIGNUP_ACTION_LOADING: {
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      }
    }
    case SIGNUP_ACTION_DONE: {
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
      }
    }
    case SIGNUP_ACTION_ERROR: {
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      }
    }
    case LOGOUT_ACTION: {
      localStorage.clear();
      return {
        ...state,
        isLogin: false,
      }
    }
    default:
      return state;
  }
};