import React, {useContext, useCallback} from 'react'
import {Link} from 'react-router-dom';
import { LOGOUT_ACTION } from '../../actions/types';
import { UserContext } from '../../reducers/userReducer';

import {HeaderWrapper, LogoH1Wrapper, MenuNavWrapper} from './styles';

function Header() {
  const [userState, dispatch] = useContext(UserContext);

  const onClickLogout = useCallback(() => {
    dispatch({type: LOGOUT_ACTION});
  },[dispatch]);
  
  return (
    <HeaderWrapper>
      <LogoH1Wrapper><Link to={'/'}>GomDoIt</Link></LogoH1Wrapper>
      <MenuNavWrapper>
        {/* 로그인 상태일 경우 todo 노출, 아닐 경우 로그인 노출 */}
        {userState.isLogin 
          ? 
            <>
              <div><Link to={'/todo'}>Todo</Link></div>
              <div onClick={onClickLogout}><Link to={'/signin'}>Logout</Link></div>
            </>
          :  <div><Link to={'/signin'}>Login</Link></div>
        } 
      </MenuNavWrapper>
    </HeaderWrapper>
  )
}

export default Header