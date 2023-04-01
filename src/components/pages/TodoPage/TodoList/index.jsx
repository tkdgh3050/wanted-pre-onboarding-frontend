import React, {useEffect, useContext, useCallback} from 'react'

import { loadTodos, updateTodo } from '../../../actions/todoAction';
import { TodoContext } from '../../../reducers/todoReducer';
import TodoItem from '../TodoItem';
import {TodoListSectionWrapper} from './styles';
import { removeTodo } from '../../../actions/todoAction';

function TodoList() {
  const [todoState, dispatch] = useContext(TodoContext);
  
  useEffect(() => { // 초기 todo 화면 접근 시 할 일 불러오기
    loadTodos(dispatch);
  }, [dispatch]);

  const removeItem = useCallback(async (id) => { // 아이템 제거 action 수행
    try {
      await removeTodo(dispatch, id);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  
  const updateItem = useCallback(async (id, data) => { // 아이템 수정 action 수행
    try {
      await updateTodo(dispatch, id, data);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

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