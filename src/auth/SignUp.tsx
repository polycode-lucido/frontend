import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright/Copyright';
import { useFormik } from 'formik';
import * as yup from 'yup';

const theme = createTheme();
const validationSchema = yup.object({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
    age: yup
      .boolean()
      .oneOf([true], 'You must be at least 13 years old to use this service'),
    cgu: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions to use this service'),
});

export default function SignUp() {
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  id="age"
                  label="I have 13+ years"
                  name='age'
                  value={formik.values.age}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  id="cgu"
                  label={<Link component={RouterLink} to="/cgu">I accept the terms of use</Link>}
                  name='cgu'
                  value={formik.values.cgu}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link component={RouterLink} to="/signin" variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}