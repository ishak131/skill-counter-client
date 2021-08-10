import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Redux/actions/viewAlert';

function Copyright() {
  return (
    <>
      {
  /*    <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" to="https://material-ui.com/">
              Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
      */}
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const api = axios.create({
  baseURL: 'http://localhost:4000/user',
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
});

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}

          validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().min(8, 'password must be at least 8 characters').max(255).required('Password is required')
            })}

          onSubmit={
            async (values) => {
              const { email, password } = values;
              await api.get(`/logIn/${email}/${password}`).then(
                res => {
                  Cookies.set(process.env.REACT_APP_TOKEN_NAME, res.data.token)
                  window.location.reload()
                  dispatch(showAlert('you are logged in successfully', 'success'))
                }).catch(err => {
                  const { error = 'Sorry somthing went wrong' } = err.response.data
                  dispatch(showAlert(error))
                })
            }}

        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) =>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}
              >
                Sign In
              </Button>

              <Grid container>
                {  /*<Grid item xs>
                  <Link to="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> 
                */}
                <Grid item>
                  <Link to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          }
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container >
  );
}