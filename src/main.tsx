import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Login from './auth/Login.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LandingPage from './LandingPage.tsx';
import Callback from './auth/Callback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="auth/callback" element={<Callback />} />
        <Route element={<App />}>
          <Route index element={<Navigate to="/landing-page" />} />
          <Route path="landing-page" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
