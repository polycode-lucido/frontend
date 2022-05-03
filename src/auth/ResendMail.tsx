import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, createTheme, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../copyright/Copyright';


export default function ResendEmail() {
    
    const theme = createTheme();

    const FormStatus = {
        Sent: 'Sent',
        Pending: 'Pending'
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setFormStatus(FormStatus.Pending);
      };
    

    const [formStatus, setFormStatus] = useState(FormStatus.Pending);

    function getBody() {
        switch (formStatus) {
            case FormStatus.Pending:
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
                          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                          </Avatar>
                          <Typography component="h1" variant="h5">
                            Please type in your email address
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
                              Resend email
                            </Button>
                            <Grid container>
                              <Grid item xs>
                                <Link component={RouterLink} to="/signin" variant='body2'>
                                  Sign in
                                </Link>
                              </Grid>
                              <Grid item>
                                <Link component={RouterLink} to="/signup" variant='body2'>
                                  {"Don't have an account? Sign Up"}
                                </Link>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                      </Container>
                    </ThemeProvider>
                  );
                
            case FormStatus.Sent:
                return <div>Verification failed, you can also verify your account using the <RouterLink to="forgot-password">forgot password</RouterLink> page.</div>;
        }
    }

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <div>
            {getBody()}
            {/* <h3 className="card-header">Verify Email</h3>
            <div className="card-body">{getBody()}</div> */}
        </div>
      </Grid>
    )
}
