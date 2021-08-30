/** @format */

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import SignIn from "./components/Auth/SignIn";

const App = () => {
  return (
    <Router>
      <Container maxWidth='lg'>
        <Navbar />

        <Route path='/' exact component={Home} />
        <Route path='/register' exact component={Auth} />
        <Route path='/login' exact component={SignIn} />
      </Container>
    </Router>
  );
};

export default App;
