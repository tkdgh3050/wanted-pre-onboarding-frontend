import React, {useState, useCallback, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import {API_URL, JWT_KEY} from '../../config';
import Title from '../Title';
import {SigninMainWrapper, SignupDivWrapper, FormDivWrapper, ErrorDivWrapper} from './styles';

function Signin() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigator = useNavigate();

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

  const onSubmitSignin = useCallback(async (event) => {
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
      const result = await axios.post(API_URL + '/auth/signin', data);

      if (result.data?.access_token) { // 받아온 결과값에 access_token 값이 존재하는 경우
        localStorage.clear();
        localStorage.setItem(JWT_KEY, result.data.access_token);
        alert('환영합니다!');
        navigator('/todo');
      } else { // 없는 경우 에러 발생
        throw new Error('예기치 못한 오류가 발생했습니다. 관리자에게 문의하세요');
      }
    } catch (error) {
      if ([401, 404].includes(error?.response.status)) { // Unauthorized 오류
        alert(error.response.data.message);
      } else {
        alert('오류가 발생했습니다. 관리자에게 문의하세요.');
      }
    }

  }, [email, password]);

  useEffect(() => { // 로그인한 경우 접근 불가 처리
    if (localStorage.getItem(JWT_KEY)) { 
      alert('잘못된 접근입니다.');
      navigator('/todo'); //todo 로 redirect
    }
  }, [navigator]);

  if (localStorage.getItem(JWT_KEY)) { // 로그인한 경우 화면을 그리지 않도록 처리
    return;
  }

  return (
    <>
      <Title title='로그인' />
      <SigninMainWrapper>
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
            <button data-testid="signin-button" onClick={onSubmitSignin} disabled={!isValid}>로그인</button>
          </FormDivWrapper>
        </form>
        <SignupDivWrapper>
          <Link to={'/signup'}><i className="fa-solid fa-user-plus"></i> 회원가입</Link>
        </SignupDivWrapper>
      </SigninMainWrapper>
    </>
  )
}

export default Signin;