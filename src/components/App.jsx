import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle, RoutesWrapper } from './GlobalStyle';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Landing from './pages/LandingPage';
import Signup from './pages/SignupPage';
import Signin from './pages/SigninPage';
import Todo from './pages/TodoPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
