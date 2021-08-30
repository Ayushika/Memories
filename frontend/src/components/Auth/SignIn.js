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
import { signIn } from "../../actions/AuthAction";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(8, "Minimun 8 characters"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    dispatch(signIn(values, history));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={2}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign In</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form className={classes.form}>
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
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />

                <Button
                  className={classes.submit}
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  fullWidth
                  disabled={!formik.isValid || formik.isSubmitting}>
                  Sign In
                </Button>
                <GoogleIcon />

                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link to='/register' className={classes.link}>
                      <p className={classes.link} variant='p'>
                        {"Don't have an account? Sign Up"}
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

export default SignIn;
