/** @format */

import React from "react";
import {
  Container,
  Typography,
  AppBar,
  Grid,
  Grow,
  Toolbar,
  Paper,
} from "@material-ui/core";
import { useStyles } from "./styles";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            MEMORIES
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container direction='row' justifyContent='center' spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
