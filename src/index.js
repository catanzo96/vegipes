import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.min.css';
import App from './App';
import { AppProvider } from './context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <App/>
      </AppProvider>
    </Router>
  </React.StrictMode>
);
