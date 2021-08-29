/** @format */

import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import TextError from "./TextError";
import useStyles from "./styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = (props) => {
  const classes = useStyles();
  const { type, label, name, handleShowPassword, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
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
                name === "password" && {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => handleShowPassword}>
                        {type === "password" ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }
            />
            <ErrorMessage name={name} component={TextError} />
          </>
        );
      }}
    </Field>
  );
};

export default Input;
