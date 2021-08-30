/** @format */

import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { TextField, InputAdornment, IconButton, Grid } from "@material-ui/core";
import TextError from "./TextError";
import useStyles from "./styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = (props) => {
  const classes = useStyles();
  const { type, label, name, handleShowPassword, half, ...rest } = props;

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <Field name={name}>
        {({ field, form }) => {
          return (
            <>
              <TextField
                type={type}
                variant='outlined'
                margin='normal'
                className={classes.input}
                fullWidth
                id={name}
                label={label}
                name={name}
                {...rest}
                {...field}
                InputProps={
                  name === "password"
                    ? {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                              {type === "password" ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    : null
                }
              />
              <ErrorMessage name={name} component={TextError} />
            </>
          );
        }}
      </Field>
    </Grid>
  );
};

export default Input;
