import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import { api } from '../../api';
import { LoginContext } from '../../context';
import Title from '../Title';
import {SignupMainWrapper, FormDivWrapper, ErrorDivWrapper} from './styles';

function Signup() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigator = useNavigate();
  const {isLogin} = useContext(LoginContext);

  const onChangeEmail = useCallback((event) => {
    setEmail(event.target.value);

    // email 유효성 검사
    if (event.target.value.match(/([@])/)) { // @ 이 포함된 경우 유효
      setEmailError(false);
      setIsValid(!passwordError && password.length > 0 ? true: false); // password 오류가 없고 글자를 입력한 경우 전체 유효성검사 통과
    } else {  // 유효하지 않은 경우
      setEmailError(true);
      setIsValid(false);
    }
  },[password, passwordError]);

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);

    // password 유효성 검사
    if (event.target.value.length >= 8) { // 8글자 이상인 경우 유효
      setPasswordError(false);
      setIsValid(!emailError && email.length > 0 ? true : false); // email 오류가 없고 글자를 입력한 경우 전체 유효성검사 통과
    } else {
      setPasswordError(true);
      setIsValid(false);
    }
  },[email, emailError]);

  const onSubmitSignup = useCallback(async (event) => {
    event.preventDefault();

    // 유효성 재검사
    if (!email.match(/([@])/)) {
      setEmailError(true);
      setIsValid(false);
      return;
    }
    if (!password.length >= 8) {
      setPasswordError(true);
      setIsValid(false);
      return;
    }

    const data = {email, password};
    try {
      await api.signup(data);
      alert('회원가입에 성공했습니다.');
      navigator('/signin');
    } catch (error) {
      if (error?.response.status === 400) { // Bad Request 오류 - 이메일 중복
        alert(error.response.data.message);
      } else {
        alert('오류가 발생했습니다. 관리자에게 문의하세요.');
      }
    }
  }, [email, password, navigator]);

  useEffect(() => { // 로그인한 경우 접근 불가 처리
    if (isLogin) { 
      alert('잘못된 접근입니다.');
      navigator('/todo'); //todo 로 redirect
      return; // 화면을 그리지 않기 위한 수단
    }
  }, [navigator, isLogin]);

  if (isLogin) { // 로그인한 경우 화면을 그리지 않도록 처리
    return;
  }

  return (
    <>
      <Title title='회원가입' />
      <SignupMainWrapper>
        <form action="" method="post">
          <FormDivWrapper>
            <input 
              data-testid="email-input" 
              placeholder='이메일'
              type='text' 
              value={email} 
              onChange={onChangeEmail}
            />
            {emailError && <ErrorDivWrapper>올바르지 않은 이메일 형식입니다.</ErrorDivWrapper>}
            <input 
              data-testid="password-input" 
              placeholder='비밀번호'
              type='password' 
              value={password} 
              onChange={onChangePassword}
              />
            {passwordError && <ErrorDivWrapper>비밀번호는 8자 이상입니다.</ErrorDivWrapper>}
            <button data-testid="signup-button" onClick={onSubmitSignup} disabled={!isValid}>로그인</button>
          </FormDivWrapper>
        </form>
      </SignupMainWrapper>
    </>
  )
}

export default Signup