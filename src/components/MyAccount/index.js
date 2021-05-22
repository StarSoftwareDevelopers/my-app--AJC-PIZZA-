import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore } from "./../../firebase/firebase.utils";
import { Link, useHistory } from "react-router-dom";
import { Barangays } from "../../pages/Check-out/barangay";
import {
  Typography,
  TextField,
  InputAdornment,
  Container,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

import MuiPhoneNumber from "material-ui-phone-number";

import "./styles.scss";
import ButtonForm from "./../Forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const MyAccount = () => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [users, setUsers] = useState([]);
  const [displayName, setdisplayName] = useState(currentUser.displayName);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);

  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(currentUser.id)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });

        setUsers(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(users);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userRef = firestore.collection("users").doc(currentUser.id);
      const res = userRef.set(
        {
          displayName,
          address: street + " ," + barangay + "" + value,
          phone,
        },
        { merge: true }
      );
      alert("Successfully updated");
    } catch (err) {
      console.log(err);
    }
    history.push("/account");
  };

  return (
    <div>
      <br></br>

      <Container>
        <div className="container">
          {users.map((user) => (
            <li>
              <Typography
                variant="h4"
                align="center"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                {user.displayName}'s Account
                <Tooltip title={<h4 style={{ color: "#fff" }}>Edit</h4>}>
                  <IconButton aria-label="delete">
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </Typography>

              {/*---------------------------------------------------------------------------------  */}
              <li>
                <div className="profileData">
                  <form onSubmit={handleSubmit}>
                    <TextField
                      id="input"
                      margin="dense"
                      type="text"
                      label="Full Name"
                      placeholder={user.displayName}
                      value={displayName}
                      color="secondary"
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
                      color="secondary"
                      defaultValue={user.email}
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
                    <Typography varian="subtitle1">
                      Your address: {user.address}
                    </Typography>
                    <TextField
                      margin="dense"
                      type="text"
                      label="Street Address"
                      value={street}
                      variant="standard"
                      color="secondary"
                      required
                      fullWidth
                      onChange={(e) => setStreet(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonPinCircleIcon
                              style={{ color: " #e31837" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: { fontSize: "17px" },
                      }}
                    />
                    <FormControl>
                      <InputLabel htmlFor="order-status">Barangay</InputLabel>
                      <Select onChange={handleChange}>
                        {Barangays.map((barangay) => (
                          <MenuItem key={barangay.value} value={barangay.value}>
                            {barangay.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {value}
                    <MuiPhoneNumber
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={user.phone}
                      required
                      color="secondary"
                      data-cy="user-phone"
                      defaultCountry={"ph"}
                      onChange={(e) => setPhone(e)}
                    />
                    <ButtonForm type="submit">Update</ButtonForm>
                  </form>
                </div>
              </li>
            </li>
          ))}
          <Link to="/recovery">
            <Typography variant="body1">Reset Password?</Typography>
          </Link>
          <br></br>
          <Link to="#">
            <Typography variant="body1">Deactivate Account?</Typography>
          </Link>
        </div>
      </Container>
      <br></br>
    </div>
  );
};

export default MyAccount;
