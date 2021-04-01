import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "./../../Redux/User/user.actions";
import Logo from "./../../assets/AJC Pizza Logo.png";
import "./style.scss";
import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import { validateAdmin } from "./../../Admin/AdminRoute/route";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const admin = validateAdmin(currentUser);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="AJC Logo" />
          </Link>
        </div>
        <div className="callingAction">
          {admin && (
            <ul className="navLinks">
              <li>
                <Link to="/admin">My Admin</Link>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul className="navLinks">
              <li>
                <Link to="/order">Order</Link>
              </li>
              <li>
                <Link to="/cart">My Cart</Link>
              </li>
              <li>
                <Link to="/order-status">Order Status</Link>
              </li>
              <li>
                <Link to="/account">My Account</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <span onClick={handleClickOpen}>Log Out</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul className="navLinks">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          )}
          <div className="hamburger-toggle">
            <MenuIcon fontSize="large" />
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Logging Out?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for visiting our site. See you again!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                signOut();
                handleClose();
              }}
              color="secondary"
              autoFocus
            >
              LogOut
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
