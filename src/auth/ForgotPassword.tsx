import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright/Copyright';
import AuthService from '../services/auth.service';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

const FormStatus = {
  Sent: 'Sent',
  Pending: 'Pending'
}

export default function ForgotPassword() {
  const [formStatus, setFormStatus] = useState(FormStatus.Pending);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    if ( email ) {
      try {
        await AuthService.forgotPassword(email.toString());
        setFormStatus(FormStatus.Sent);
      }
      catch(err) {
        if ( err instanceof AxiosError && err.response)
          toast.error(err.response.data.message);
      }
    } 
  };

  function getBody() {
    switch (formStatus) {
      case FormStatus.Pending:
        return (
            <div>
                <ToastContainer />
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Forgot password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send new email
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link component={RouterLink} to="/signin" variant='body2'>
                        {"Remembered your password?"}
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link component={RouterLink} to="/signup" variant='body2'>
                        {"Don't have an account?"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                </div>

        );
            
      case FormStatus.Sent:
        return (
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '80vh' }}
        >
          <div>
              <h3 className="card-header">Check your inbox</h3>
              <div className="card-body">
                  <p>
                      A new email has been sent to you. Please check your inbox and click on the link to reset your password.
                  </p>
                  <Link component={RouterLink} to="/signin">Go to sign in</Link>

              </div>
          </div>
        </Grid>
        );
    }
  }

  return (
    <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
              {getBody()}
              <Copyright sx={{ mt: 8, mb: 4 }} />
              </Box>
            </Container>
          </ThemeProvider>
  );
}
