/** @format */
import React, { useState } from "react";
import GoogleIcon from "./GoogleIcon";
import useStyles from "./styles";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormikControl from "../FormContainer/FormikControl";
import { Formik, Form } from "formik";
import { signUp } from "../../actions/AuthAction";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required !"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(8, "Minimun 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Confirm Password Must Match Password")
      .required("Required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    dispatch(signUp(values, history));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={2}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign Up</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <FormikControl
                    control='input'
                    name='firstName'
                    label='First Name'
                    type='text'
                    half
                  />
                  <FormikControl
                    control='input'
                    name='lastName'
                    label='Last Name'
                    type='text'
                    half
                  />
                </Grid>
                <FormikControl
                  control='input'
                  name='email'
                  label='Email'
                  type='email'
                />

                <FormikControl
                  control='input'
                  name='password'
                  label='Password'
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />

                <FormikControl
                  control='input'
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                />

                <Button
                  className={classes.submit}
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  fullWidth
                  disabled={!formik.isValid || formik.isSubmitting}>
                  Sign Up
                </Button>
                <GoogleIcon />

                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link to='/login' className={classes.link}>
                      <p className={classes.link} variant='body2'>
                        {"Already have an account? Sign In"}
                      </p>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Auth;
