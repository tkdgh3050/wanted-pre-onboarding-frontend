import React ,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import Title from '../Title';
import TodoList from './TodoList';
import {TodoMainWrapper} from './styles';
import TodoForm from './TodoForm';
import { UserContext } from '../../reducers/userReducer';

function Todo() {
  const [userState, ] = useContext(UserContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (!userState.isLogin) { // 로그인 하지 않은 상태로 접근 시 로그인으로 리다이렉션
      alert('로그인이 필요합니다.');
      navigator('/signin');
    }
  }, [navigator, userState]);

  if (!userState.isLogin) return null; // 로그인 하지 않으면 화면을 그리지 않도록

  return (
    <>
      <Title title='Todo'/>
      <TodoMainWrapper>
        <TodoForm />
        <TodoList />
      </TodoMainWrapper>
    </>
  )
}

export default Todo