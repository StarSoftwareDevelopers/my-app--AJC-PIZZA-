import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "./../../firebase/firebase.utils";
import { Link, useHistory } from "react-router-dom";

import { Typography, TextField, InputAdornment } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

import MuiPhoneNumber from "material-ui-phone-number";

import "./styles.scss";
import Button from "./../Forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const MyAccount = () => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const userRef = firestore.collection("users").doc(currentUser.id);
      const res = userRef.set(
        {
          displayName,
          address,
          phone,
        },
        { merge: true }
      );
      history.push("/account");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <br></br>

      <Container>
        <div className="container">
          <Typography
            variant="h4"
            align="center"
            style={{
              marginBottom: "1.5rem",
            }}
          >
            {currentUser.displayName}'s Account
            <Tooltip title={<h4 style={{ color: "#fff" }}>Edit</h4>}>
              <IconButton aria-label="delete">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Typography>

          <div className="profileData">
            <form onSubmit={handleSubmit}>
              <TextField
                id="input"
                margin="dense"
                type="text"
                label="Full Name"
                placeholder={currentUser.displayName}
                value={displayName}
                fullWidth
                required
                onChange={(e) => setdisplayName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: " #e31837" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: "17px" },
                }}
              />
              <TextField
                disabled
                margin="dense"
                type="email"
                label="Email"
                defaultValue={currentUser.email}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: " #e31837" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: "17px" },
                }}
              />
              <TextField
                margin="dense"
                type="text"
                label="Address"
                placeholder={currentUser.address}
                value={address}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonPinCircleIcon style={{ color: " #e31837" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: "17px" },
                }}
              />
              <MuiPhoneNumber
                fullWidth
                name="phone"
                label="Phone Number"
                value={currentUser.phone}
                required
                data-cy="user-phone"
                defaultCountry={"ph"}
                onChange={(e) => setPhone(e)}
              />
              <Button type="submit">Update</Button>
            </form>
            <Link to="/recovery">
              <Typography variant="body1">Reset Password?</Typography>
            </Link>
          </div>
        </div>
      </Container>
      <br></br>
    </div>
  );
};

// <Typography variant="h5" style={{}}>
//               Name {currentUser.displayName}
//             </Typography>

//             <h4>Email: {currentUser.email}</h4>
//             <h4>Joined at: {currentUser.createdDate.toDate().toString()}</h4>
//             <h4>Address: {currentUser.address}</h4>

//             <form onSubmit={addAddress}>
//               <input
// //                 type="text"
// //                 placeholder="enter address"
// //                 onChange={(e) => setAddress(e.target.value)}
// //               />
// //               <button type="submit">Add</button>
//             </form>

export default MyAccount;
