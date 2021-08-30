/** @format */
import { Button } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Icon from "./Icon";
import useStyles from "./styles";

const GoogleIcon = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const googleSucess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      //redirect to home
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Login failed");
  };

  return (
    <GoogleLogin
      clientId='675013563787-etc325u6jj6elg5941507cob1s672egl.apps.googleusercontent.com'
      render={(renderProps) => (
        <Button
          className={classes.googleButton}
          size='large'
          variant='contained'
          color='primary'
          fullWidth
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          startIcon={<Icon />}>
          Google Sign In
        </Button>
      )}
      onSuccess={googleSucess}
      onFailure={googleFailure}
      cookiePolicy='single_host_origin'
    />
  );
};

export default GoogleIcon;
