import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DesignSystem from './pages/DesignSystem';
import ButtonPage from './pages/components/button';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ButtonPage />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
