import React from 'react'

import {FooterDivWrapper} from './styles';

function Footer() {
  return (
    <>
      <hr/>
      <FooterDivWrapper>
      <h4>About</h4>
        <span>This site was created by Gomsang. 
          If you find any bugs, please send me an&nbsp; 
          <a href='mailto:tkdgh3050@gmail.com'>email</a> 
          <i className="fa-regular fa-face-smile-wink"></i>
        </span>
      </FooterDivWrapper>
    </>
  )
}

export default Footer