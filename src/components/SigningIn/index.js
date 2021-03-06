import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../Redux/User/user.actions";

import "./style.scss";

import ButtonForm from "./../Forms/Button";

import {
  Typography,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";

import { FaFacebook, FaGoogle, FaMailBulk } from "react-icons/fa";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
}); //to get from the redux store

const SigninIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //whenever signinsuccess is true
    if (currentUser) {
      resetForm();
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
    setIsLoading(true);
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="container">
      <div className="wrap">
        <h2>Log in</h2>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <div className="grouped">
              <TextField
                autoFocus
                margin="dense"
                type="email"
                label="Email"
                color="secondary"
                fullWidth
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br></br>

              {/* {Might use this for password validation - https://www.npmjs.com/package/material-ui-password-field} */}

              <TextField
                margin="dense"
                type="password"
                label="Password"
                fullWidth
                color="secondary"
                variant="outlined"
                helperText="Password must be more than 6 characters long"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Link to="/recovery">
                <Typography align="center" variant="subtitle1" display="block">
                  Forgot Password?
                </Typography>
              </Link>

              <br></br>
              <ButtonForm type="submit" className="btn">
                {isLoading ? (
                  <p>
                    {" "}
                    <Typography variant="h6" align="center" display="block">
                      Logging In...
                    </Typography>
                  </p>
                ) : (
                  <Typography variant="h6" align="center" display="block">
                    Log In
                  </Typography>
                )}
              </ButtonForm>

              <br></br>
              <Divider />
              <Typography variant="subtitle2" align="center" display="block">
                Or Continue with
              </Typography>

              <div className="socialSignin">
                <div className="row">
                  <Tooltip title="Continue with Google">
                    <IconButton
                      onClick={handleGoogleSignIn}
                      aria-label="googleSignIn"
                    >
                      <FaGoogle
                        style={{
                          color: "#EA4335",
                          fontSize: "30px",
                        }}
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Register with email">
                    <Link to="/registration">
                      <IconButton aria-label="mailRegister">
                        <FaMailBulk
                          style={{
                            color: "#e31837",
                            fontSize: "30px",
                          }}
                        />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninIn;
