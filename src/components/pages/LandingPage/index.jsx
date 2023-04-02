import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { UserContext } from '../../reducers/userReducer';

import Title from '../Title';
import {MainWrapper, IntroSectionWrapper} from './styles';

function Landing() {
  const [userState, ] = useContext(UserContext);
  return (
    <>
      <Title title='' />
      <MainWrapper>
        <img src="/gomsang.png" alt="메인이미지" />
        <IntroSectionWrapper>
          <h2>Gom Can Do It !</h2>
          <p>해야 할 일을 기록하는 Todo 페이지입니다.</p>
          <button><Link to={userState.isLogin ? '/todo' : '/signin'} >이용하러 가기</Link></button>
        </IntroSectionWrapper>
      </MainWrapper>
      
    </>
  )
}

export default Landing