/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grow, Grid, Container } from "@material-ui/core";
import Posts from "../Posts/Posts";
import FormContainer from "../FormContainer/FormContainer";
import { getPosts } from "../../actions/PostAction";

const Home = () => {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setcurrentId={setcurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormContainer setcurrentId={setcurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
