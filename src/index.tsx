import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './pages/Home/App';

import './global.scss';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ModulesProvider } from './hooks/useModules';

ReactDOM.render(
  <React.StrictMode>
    <ModulesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ModulesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
