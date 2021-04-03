import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "./../../Redux/User/user.actions";
<<<<<<< HEAD
=======
import { countCartItems } from "./../../Redux/Cart/cartHeader";
>>>>>>> 2469d92c9e830c0cc692b62519a2e8db41ca4640
import "./header.scss";
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

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  numCartItems: countCartItems(state),
});

const Header = (props) => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { currentUser } = useSelector(mapState);
=======
  const { currentUser, countCartItems } = useSelector(mapState);
>>>>>>> 2469d92c9e830c0cc692b62519a2e8db41ca4640
  const [open, setOpen] = React.useState(false);

  //for the navbar burger
  const [menuOpen, setMenuOpen] = useState(false);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const admin = validateAdmin(currentUser);

  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">AJC PIZZA</Link>
        </div>
        {admin && (
          <ul
            className="nav-links"
            style={{
<<<<<<< HEAD
              transform: menuOpen ? "translateX(0px)" : "translate(-500px)",
              marginRight: "-770px",
=======
              transform: menuOpen ? "translateX(200px)" : "translate(-500px)",
              marginRight: "-500px",
>>>>>>> 2469d92c9e830c0cc692b62519a2e8db41ca4640
            }}
          >
            <li>
              <Link to="/admin">My Admin</Link>
            </li>
          </ul>
        )}
<<<<<<< HEAD
=======

>>>>>>> 2469d92c9e830c0cc692b62519a2e8db41ca4640
        {currentUser && (
          <ul
            className="nav-links"
            style={{
              transform: menuOpen ? "translateX(0px)" : "translate(-500px)",
              marginRight: "-500px",
            }}
          >
            <li>
<<<<<<< HEAD
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
=======
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/cart">My Cart{countCartItems}</Link>
>>>>>>> 2469d92c9e830c0cc692b62519a2e8db41ca4640
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
          <ul
            className="nav-links"
            style={{
              transform: menuOpen ? "translateX(0px)" : "translate(-500px)",
              marginRight: "-500px",
            }}
          >
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        )}
        <IconButton className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </nav>
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
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
