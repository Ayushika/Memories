/** @format */

import React, { useState } from "react";
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
import * as Yup from "yup";

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const switchMode = () => setIsSignUp((prev) => !prev);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required !"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(8, "Minimun 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Confirm Password Must Match Password")
      .required("Required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    console.log(values);
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
                        name='name'
                        label='Name'
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
