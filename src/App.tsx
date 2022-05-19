import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CGU from './components/auth/CGU';
import ChangePassword from './components/auth/ChangePassword';
import EmailNotification from './components/auth/EmailNotification';
import EmailVerification from './components/auth/EmailVerification';
import ForgotPassword from './components/auth/ForgotPassword';
import ResendEmail from './components/auth/ResendMail';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import HomePage from './components/home_page/HomePage';
import LandingPage from './components/landing_page/LandingPage';
import Navigation from './components/navigation/Navigation';
import UserContextProvider from './contexts/userContext';

function App() {
  return (
    <Container className="App" maxWidth={false} disableGutters={true} >
      <UserContextProvider>
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
      </BrowserRouter>
      </UserContextProvider>
    </Container>
  );
}

export default App;
