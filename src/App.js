import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global.js';
import { toast } from 'react-toastify';

function App() {
  toast.configure({
    autoClose: 10000,
    draggable: false
  });
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
