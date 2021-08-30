/** @format */

import React, { useState } from "react";
import Icon from "./Icon";
import useStyles from "./styles";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormikControl from "../FormContainer/FormikControl";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signUp, signIn } from "../../actions/AuthAction";

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const switchMode = () => setIsSignUp((prev) => !prev);

  const dispatch = useDispatch();

  const googleSucess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      //redirect to home
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Login failed");
  };

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
    if (isSignUp) {
      dispatch(signUp(values, history));
    } else {
      dispatch(signIn(values, history));
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={2}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  {isSignUp && (
                    <>
                      <FormikControl
                        control='input'
                        name='firstName'
                        label='First Name'
                        type='text'
                      />
                      <FormikControl
                        control='input'
                        name='lastName'
                        label='Last Name'
                        type='text'
                      />
                    </>
                  )}

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
                    type='password'
                    handleShowPassword={handleShowPassword}
                  />
                  {isSignUp && (
                    <FormikControl
                      control='input'
                      name='confirmPassword'
                      label='Confirm Password'
                      type='password'
                    />
                  )}

                  <Button
                    className={classes.submit}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                    disabled={!formik.isValid || formik.isSubmitting}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                  <GoogleLogin
                    clientId='675013563787-etc325u6jj6elg5941507cob1s672egl.apps.googleusercontent.com'
                    render={(renderProps) => (
                      <Button
                        className={classes.googleButton}
                        size='large'
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}>
                        Google Sign In
                      </Button>
                    )}
                    onSuccess={googleSucess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                  />
                </Grid>

                <Grid container justify='flex-end'>
                  <Grid item>
                    <Button className={classes.link} onClick={switchMode}>
                      {isSignUp
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                    </Button>
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
