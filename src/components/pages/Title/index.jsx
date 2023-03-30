import React, {useEffect} from 'react'

import {TitleH2Wrapper} from './styles';

function Title({title = ''}) {
  useEffect(() => {
    // 브라우저 타이틀을 화면마다 세팅해주기 위한 설정
    document.title = title === '' ? "GomDoIt" : `${title} - GomDoIt`;
  }, [title]);

  return (
    <TitleH2Wrapper>{title}</TitleH2Wrapper>
  )
}

export default Title