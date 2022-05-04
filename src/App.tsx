import { Container } from '@mui/material';
import { padding } from '@mui/system';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CGU from './auth/CGU';
import ChangePassword from './auth/ChangePassword';
import EmailNotification from './auth/EmailNotification';
import EmailVerification from './auth/EmailVerification';
import ForgotPassword from './auth/ForgotPassword';
import ResendEmail from './auth/ResendMail';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import HomePage from './home_page/HomePage';
import LandingPage from './landing_page/LandingPage';
import Navigation from './navigation/Navigation';
import AuthService from './services/auth.service';

function App() {

  useEffect(() => {
    AuthService.refreshUser();
  },);

  return (
    <Container className="App" maxWidth={false} disableGutters={true} >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="cgu" element={<CGU />} />
          <Route path="emailverification" element={<EmailVerification />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="verifyemail" element={<EmailNotification />} />
          <Route path="resendmail" element={<ResendEmail />} />
        </Routes>
      </BrowserRouter>,
    </Container>
  );
}

export default App;
