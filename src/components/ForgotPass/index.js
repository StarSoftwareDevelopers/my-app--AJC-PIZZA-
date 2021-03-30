import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassStart, resetStateUser } from "../../Redux/User/user.actions";
import "./styles.scss";
import Button from "../Forms/Button";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

const mapState = ({ user }) => ({
  resetPassSuccess: user.resetPassSuccess,
  errorUser: user.errorUser,
});

const EmailPass = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPassSuccess, errorUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPassSuccess) {
      alert("Password reset successful. Please check your email");
      dispatch(resetStateUser());
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPassSuccess]);

  useEffect(() => {
    if (Array.isArray(errorUser) && errorUser.length > 0) {
      setErrors(errorUser);
    }
  }, [errorUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassStart({ email }));
  };

  return (
    <div className="container">
      <div className="wrap">
        <h2>Forgot Password?</h2>
        <ThemeProvider theme={theme}>
          <Typography variant="body1" align="center">
            Enter your email and we'll send you a link to reset your password
          </Typography>
          <div className="formWrap">
            {errors.length > 0 && (
              <Typography color="error" align="center">
                {errors.map((e, index) => {
                  return (
                    <li key={index} style={{ listStyleType: "none" }}>
                      {e}
                    </li>
                  );
                })}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
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

              <Button type="submit">
                <Typography variant="h6">Reset Password</Typography>
              </Button>
            </form>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default EmailPass;
