import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './pages/Home/App';

import './global.scss';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ModulesProvider } from './hooks/useModules';
import { ClassesProvider } from './hooks/useClasses';

ReactDOM.render(
  <React.StrictMode>
    <ModulesProvider>
      <ClassesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ClassesProvider>
    </ModulesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
