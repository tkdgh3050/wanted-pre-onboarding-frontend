import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { LoginContext } from '../../context';

import {HeaderWrapper, LogoH1Wrapper, MenuNavWrapper} from './styles';

function Header() {
  const {isLogin} = useContext(LoginContext);
  return (
    <HeaderWrapper>
      <LogoH1Wrapper><Link to={'/'}>GomDoIt</Link></LogoH1Wrapper>
      <MenuNavWrapper>
        {/* 로그인 상태일 경우 todo 노출, 아닐 경우 로그인 노출 */}
        {isLogin 
          ? <div><Link to={'/todo'}>Todo</Link></div>
          :  <div><Link to={'/signin'}>Login</Link></div>
        } 
      </MenuNavWrapper>
    </HeaderWrapper>
  )
}

export default Header