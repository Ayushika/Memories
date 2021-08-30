/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import SignIn from "./components/Auth/SignIn";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Router>
      <Container maxWidth='xl'>
        <Navbar />

        <Route path='/' exact component={() => <Redirect to='/posts' />} />
        <Route path='/posts' exact component={Home} />
        <Route path='/posts/search' exact component={Home} />
        <Route path='/posts/:id' component={PostDetails} />
        <Route path='/register' exact component={Auth} />
        <Route path='/login' exact component={SignIn} />
      </Container>
    </Router>
  );
};

export default App;
