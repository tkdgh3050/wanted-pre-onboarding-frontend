import React, {useReducer} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserContext, userReducer, userInitialState } from './reducers/userReducer';
import { GlobalStyle, RoutesWrapper } from './GlobalStyle';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Landing from './pages/LandingPage';
import Signup from './pages/SignupPage';
import Signin from './pages/SigninPage';
import Todo from './pages/TodoPage';
import { TodoContext, todoInitialState, todoReducer } from './reducers/todoReducer';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={useReducer(userReducer, userInitialState)}>
          <TodoContext.Provider value={useReducer(todoReducer, todoInitialState)}>
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
          </TodoContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
