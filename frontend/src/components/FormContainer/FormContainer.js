/** @format */
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "./styles";
import { Paper, Typography, Button } from "@material-ui/core";
import FormikControl from "./FormikControl";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/PostAction";

const FormContainer = ({ currentId, setcurrentId }) => {
  const [formValues, setFormValues] = useState(null);
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null,
  );

  const initialValues = {
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentId) {
      setFormValues(post);
    }
  }, [post, currentId]);

  const validationSchema = Yup.object({
    creator: Yup.string().required("Required !"),
    title: Yup.string().required("Required !"),
    message: Yup.string().required("Required !"),
   
  });

  const onSubmit = async (values, onSubmitProps) => {
    if (currentId) {
      dispatch(updatePost(currentId, values));
    } else {
      dispatch(createPost(values));
    }
    onSubmitProps.setSubmitting(false);
    setcurrentId(null);
    initialValues.selectedFile = "";
    setFormValues(initialValues);
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => (
        <Paper className={classes.paper}>
          <Form className={`${classes.root} ${classes.form}`}>
            <Typography variant='h6'>
              {currentId ? "Editing" : "Creating"} A Memory
            </Typography>
            <FormikControl
              control='input'
              name='creator'
              label='Creator'
              type='text'
            />
            <FormikControl
              control='input'
              name='title'
              label='Title'
              type='text'
            />
            <FormikControl
              control='input'
              name='message'
              label='Message'
              type='text'
            />
            <FormikControl
              control='input'
              name='tags'
              label='Tags'
              type='text'
            />
            <div className={classes.fileInput}>
              <FormikControl
                name='selectedFile'
                type='file'
                control='fileUpload'
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              fullWidth
              disabled={!formik.isValid || formik.isSubmitting}>
              {currentId ? "Edit" : "Create"}
            </Button>
          </Form>
        </Paper>
      )}
    </Formik>
  );
};

export default FormContainer;
