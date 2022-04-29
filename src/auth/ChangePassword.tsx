import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, LinearProgress, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import Copyright from '../copyright/Copyright';
import * as yup from 'yup';
import { useFormik } from 'formik';

const theme = createTheme();

const validationSchema = yup.object({
  password: yup
  .string()
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required'),
  passwordConfirm: yup
  .string()
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required') 
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function ChangePassword() {
  const TokenStatus = {
    Verifying: 'Verifying',
    Failed: 'Failed',
    Verified: 'Verified',
    Successful: 'Successful',
  }
  
  const [tokenStatus, ] = useState(TokenStatus.Successful);
  const [searchParams, ] = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    console.log(token);
  }, []);
  
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      age: false,
      cgu: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Verifying:
        return (         
          <div>
            <h3 className="card-header">Verifying your request...</h3>
            <div className="card-body">
            <Box sx={{ width:'100%', marginTop: '30px', justifyContent: 'center', alignContent:'center', alignItems: 'center' }}>
              <LinearProgress />
            </Box> 
            </div>
          </div>);
        case TokenStatus.Failed:
          return <div>Sorry, something went wrong.</div>;
        case TokenStatus.Verified:
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
                    Change your password
                  </Typography>
                  <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="passwordConfirm"
                          label="Please retype your password"
                          type="password"
                          id="passwordConfirm"
                          autoComplete="new-password"
                          value={formik.values.passwordConfirm}
                          onChange={formik.handleChange}
                          error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                          helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                        />
                      </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Change password
                    </Button>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          );
          case TokenStatus.Successful:
            return (
              <div>
              <h3 className="card-header">Successfully changed your password !</h3>
                <div className="card-body">
                <Link component={RouterLink} to="/signin"><h3> Sign in </h3></Link>
              </div>
            </div>
          );
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
          {getBody()}
        </Grid>
        );
      }
      