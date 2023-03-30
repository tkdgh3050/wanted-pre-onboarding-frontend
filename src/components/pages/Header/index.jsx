import React from 'react'
import {Link} from 'react-router-dom';

import {HeaderWrapper, LogoH1Wrapper, MenuNavWrapper} from './styles';

function Header() {
  return (
    <HeaderWrapper>
      <LogoH1Wrapper><Link to={'/'}>GomDoIt</Link></LogoH1Wrapper>
      <MenuNavWrapper>
        <div><Link to={'/signin'}>Login</Link></div>
        <div><Link to={'/todo'}>Todo</Link></div>
      </MenuNavWrapper>
    </HeaderWrapper>
  )
}

export default Header