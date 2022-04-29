import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import CGU from './auth/CGU';
import ForgotPassword from './auth/ForgotPassword';
import EmailVerification from './auth/EmailVerification';
import ChangePassword from './auth/ChangePassword';
import EmailNotification from './auth/EmailNotification';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="cgu" element={<CGU />} />
      <Route path="emailverification" element={<EmailVerification />} />
      <Route path="changepassword" element={<ChangePassword />} />
      <Route path="verifyemail" element={<EmailNotification />} />
    </Routes>
  </BrowserRouter>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
