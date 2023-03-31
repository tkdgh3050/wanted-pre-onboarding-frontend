import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginContext } from './context';
import { GlobalStyle, RoutesWrapper } from './GlobalStyle';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Landing from './pages/LandingPage';
import Signup from './pages/SignupPage';
import Signin from './pages/SigninPage';
import Todo from './pages/TodoPage';
import { JWT_KEY } from './config';

function App() {
  // 로그인 여부를 전역으로 관리하기 위한 state
  const [isLogin, setIsLogin] = useState(localStorage.getItem(JWT_KEY) ? true : false);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <LoginContext.Provider value={{isLogin, setIsLogin}}>
          <Header />
          <RoutesWrapper>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/todo" element={<Todo />} />
            </Routes>
          </RoutesWrapper>
          <Footer />
        </LoginContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
