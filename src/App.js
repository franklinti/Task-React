import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/auth' //garantir dados do usuario por toda aplicacao
import {  Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </Provider>


  );
}

export default App;
