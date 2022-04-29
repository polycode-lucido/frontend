import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import './App.css';
import SignIn from './auth/SignIn';

function App() {
  return (
    <div className="App">
      <body>
        <Link component={RouterLink} to={"/signin"}>Sign in</Link>
        <Link component={RouterLink} to={"/signup"}>Sign up</Link>
      </body>
    </div>
  );
}

export default App;
