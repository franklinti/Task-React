import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/auth' //garantir dados do usuario por toda aplicacao
/* import {  Provider } from 'react-redux';
import store from './store'; */
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
    <GlobalStyle/>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </>

  );
}

export default App;
