/** @format */

import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    localStorage.clear("profile");
    history.push("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to='/'
            className={classes.heading}
            variant='h3'
            align='center'>
            Memories
          </Typography>
          <img
            src={memories}
            className={classes.image}
            alt='memories'
            height='80rem'
          />
        </div>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant='h6'>
                {user.result.name}
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                className={classes.logout}
                onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/register'>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
