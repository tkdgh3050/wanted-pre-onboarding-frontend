import { createContext } from 'react';
import {
  ADD_TODO_ACTION_DONE, ADD_TODO_ACTION_ERROR, ADD_TODO_ACTION_LOADING,
  LOAD_TODO_ACTION_DONE, LOAD_TODO_ACTION_ERROR, LOAD_TODO_ACTION_LOADING,
  UPDATE_TODO_ACTION_DONE, UPDATE_TODO_ACTION_ERROR, UPDATE_TODO_ACTION_LOADING,
  REMOVE_TODO_ACTION_DONE, REMOVE_TODO_ACTION_ERROR, REMOVE_TODO_ACTION_LOADING,
} from '../actions/types';

export const TodoContext = createContext();

export const todoInitialState = {
  todoDataList: [],
  addTodoLoading: false,
  addTodoDone: false,
  addTodoError: null,
  loadTodoLoading: false,
  loadTodoDone: false,
  loadTodoError: null,
  updateTodoLoading: false,
  updateTodoDone: false,
  updateTodoError: null,
  removeTodoLoading: false,
  removeTodoDone: false,
  removeTodoError: null,
}

export const todoReducer = (state, action) => {
  switch (action.type) {
    case LOAD_TODO_ACTION_LOADING: {
      return {
        ...state,
        loadTodoLoading: true,
        loadTodoDone: false,
        loadTodoError: null,
      }
    }
    case LOAD_TODO_ACTION_DONE: {
      return {
        ...state,
        loadTodoLoading: false,
        loadTodoDone: true,
        todoDataList: action.data,
      }
    }
    case LOAD_TODO_ACTION_ERROR: {
      return {
        ...state,
        loadTodoLoading: true,
        loadTodoError: action.error,
      }
    }
    case ADD_TODO_ACTION_LOADING: {
      return {
        ...state,
        addTodoLoading: true,
        addTodoDone: false,
        addTodoError: null,
      }
    }
    case ADD_TODO_ACTION_DONE: {
      return {
        ...state,
        addTodoLoading: false,
        addTodoDone: true,
        todoDataList: [...state.todoDataList, action.data],
      }
    }
    case ADD_TODO_ACTION_ERROR: {
      return {
        ...state,
        addTodoLoading: true,
        addTodoError: action.error,
      }
    }
    case UPDATE_TODO_ACTION_LOADING: {
      return {
        ...state,
        updateTodoLoading: true,
        updateTodoDone: false,
        updateTodoError: null,
      }
    }
    case UPDATE_TODO_ACTION_DONE: {
      return {
        ...state,
        updateTodoLoading: false,
        updateTodoDone: true,
        todoDataList: state.todoDataList.map((v) => {
          if (v.id === action.data.id) return action.data // 업데이트한 대상만 변경 진행
          return v;
        }),
      }
    }
    case UPDATE_TODO_ACTION_ERROR: {
      return {
        ...state,
        updateTodoLoading: true,
        updateTodoError: action.error,
      }
    }
    case REMOVE_TODO_ACTION_LOADING: {
      return {
        ...state,
        removeTodoLoading: true,
        removeTodoDone: false,
        removeTodoError: null,
      }
    }
    case REMOVE_TODO_ACTION_DONE: {
      return {
        ...state,
        removeTodoLoading: false,
        removeTodoDone: true,
        todoDataList: state.todoDataList.filter((v) => v.id !== action.data), // 삭제한 데이터만 제거
      }
    }
    case REMOVE_TODO_ACTION_ERROR: {
      return {
        ...state,
        removeTodoLoading: true,
        removeTodoError: action.error,
      }
    }
    default:
      return state;
  }
};