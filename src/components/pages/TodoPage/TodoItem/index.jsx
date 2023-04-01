import React, {useState, useCallback} from 'react'

import {TodoListLiWrapper} from './styles';

function TodoItem({todoData, removeItem, updateItem}) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [modifyInput, setModifyInput] = useState(todoData.todo);

  const onClickModifyMode = useCallback(() => { // 수정 눌렀을 시
    setModifyInput(todoData.todo);  // 수정 input 을 다시 세팅
    setIsModifyMode(!isModifyMode); // 수정 모드 토글
  }, [isModifyMode, todoData.todo]);

  const onChangeModifyInput = useCallback((event) => { // 수정 input 입력 시
    setModifyInput(event.target.value);
  },[]);

  const onClickDelete = useCallback((id) => () => { // 삭제 클릭 시 상위 컴포넌트에 id 값 전달
    removeItem(id);
  }, [removeItem]);

  const oncClickTodoModify = useCallback((prevTodoData) => () => { // todo 값 수정 시 상위 컴포넌트에 데이터 전달
    const data = {
      isCompleted: prevTodoData.isCompleted,
      todo: modifyInput,
    };
    updateItem(prevTodoData.id, data);
    setIsModifyMode(false); // 수정모드 종료
  }, [updateItem, modifyInput]);

  const onChangeCompletedModify = useCallback((prevTodoData) => () => { // todo 완료 시 상위 컴포넌트에 데이터 전달
    const data = {
      todo: prevTodoData.todo,
      isCompleted: !prevTodoData.isCompleted,
    };
    updateItem(prevTodoData.id, data);
  }, [updateItem]);

  return (
    <TodoListLiWrapper>
      {isModifyMode
        ?
        <>
          <label>
            <input data-testid="modify-input" value={modifyInput} onChange={onChangeModifyInput} className='modifyInput'/>
          </label>
          <div>
            <button data-testid="submit-button" className='modify' onClick={oncClickTodoModify(todoData)}>제출</button>
            <button data-testid="cancel-button" className='delete' onClick={onClickModifyMode}>취소</button>
          </div>
        </>
        :
        <>
          <label>
            <input type="checkbox" checked={todoData.isCompleted} onChange={onChangeCompletedModify(todoData)} />
            <span className={`${todoData.isCompleted ? 'completed' : ''}`}>{todoData.todo}</span>
          </label>
          <div>
            <button data-testid="modify-button" className='modify' onClick={onClickModifyMode}>수정</button>
            <button data-testid="delete-button" className='delete' onClick={onClickDelete(todoData.id)}>삭제</button>
          </div>
        </>
      }
    </TodoListLiWrapper>
  )
}

export default TodoItem