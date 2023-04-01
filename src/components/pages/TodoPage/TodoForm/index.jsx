import React, {useState, useCallback, useRef, useContext} from 'react';
import { addTodo } from '../../../actions/todoAction';
import { TodoContext } from '../../../reducers/todoReducer';

import { TodoFromSectionWrapper } from './styles';

function TodoForm() { 
  const [todoInput, setTodoInput] = useState('');
  const todoInputRef = useRef(null);
  const [ , dispatch] = useContext(TodoContext);

  const onChangeTodoInput = useCallback((event) => { // 새로운 todo 입력하는 부분
    setTodoInput(event.target.value);
  },[]);

  const onClickSubmit = useCallback( async (event) => { // 새로운 todo 추가 로직
    event.preventDefault();

    if (!todoInput.length > 0) { // todo 를 입력하지 않은 상태로 추가했을 경우
      alert('할 일을 입력해주세요!');
      todoInputRef.current.focus();       // todo input에 포커스
      return;
    }
    const data = {todo: todoInput};
    try {
      await addTodo(dispatch, data);
      setTodoInput(''); // 추가하면 todo 입력부분 비워주기
    } catch (error) {
      
    }
  },[todoInput, todoInputRef, dispatch]);

  return (
    <TodoFromSectionWrapper>
      <form method="post">
        <input 
          data-testid="new-todo-input" 
          value={todoInput} 
          onChange={onChangeTodoInput}  
          placeholder='할 일을 입력해주세요!'
          ref={todoInputRef}
        />
        <button data-testid="new-todo-add-button" onClick={onClickSubmit}>추가</button>
      </form>
    </TodoFromSectionWrapper>
  )
}

export default TodoForm;