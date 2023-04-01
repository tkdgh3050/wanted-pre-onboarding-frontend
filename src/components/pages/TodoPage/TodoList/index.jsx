import React, {useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router-dom';

import { loadTodos, updateTodo } from '../../../actions/todoAction';
import { TodoContext } from '../../../reducers/todoReducer';
import TodoItem from '../TodoItem';
import {TodoListSectionWrapper} from './styles';
import { removeTodo } from '../../../actions/todoAction';
import { UserContext } from '../../../reducers/userReducer';
import { LOGOUT_ACTION } from '../../../actions/types';

function TodoList() {
  const [todoState, dispatch] = useContext(TodoContext);
  const [, userDispatch] = useContext(UserContext);
  const navigator = useNavigate();
  
  useEffect(() => {
    async function loadingTodos() { // 초기 todo 화면 접근 시 할 일 불러오기
      try {
        await loadTodos(dispatch);
      } catch (error) {
        if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류인 경우 로그아웃 시킨 뒤 로그인 화면으로 이동
          userDispatch({type: LOGOUT_ACTION});
          navigator('/signin');
        }
      }
    }
    loadingTodos();
  }, [dispatch, userDispatch, navigator]);

  const removeItem = useCallback(async (id) => { // 아이템 제거 action 수행
    try {
      await removeTodo(dispatch, id);
    } catch (error) {
      if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류인 경우 로그아웃 시킨 뒤 로그인 화면으로 이동
        userDispatch({type: LOGOUT_ACTION});
        navigator('/signin');
      }
    }
  }, [dispatch, userDispatch, navigator]);
  
  const updateItem = useCallback(async (id, data) => { // 아이템 수정 action 수행
    try {
      await updateTodo(dispatch, id, data);
    } catch (error) {
      if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류인 경우 로그아웃 시킨 뒤 로그인 화면으로 이동
        userDispatch({type: LOGOUT_ACTION});
        navigator('/signin');
      }
    }
  }, [dispatch, userDispatch, navigator]);

  return (
    <TodoListSectionWrapper>
      {todoState.todoDataList.length > 0
        ? todoState.todoDataList.map(
            todoData => 
              <TodoItem 
                key={todoData.id} 
                todoData={todoData} 
                removeItem={removeItem}
                updateItem={updateItem}
              />
          )
        : <div>할 일이 없습니다. 추가해주세요!</div>
      }
    </TodoListSectionWrapper>
  )
}

export default TodoList