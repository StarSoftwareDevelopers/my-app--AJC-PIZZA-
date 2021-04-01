import React, { useState, Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { firestore } from "./../../firebase/firebase.utils";

// https://reactjs.org/docs/forms.html#controlled-components
//might need to check about formik

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ContactUs = (props) => {
  const { currentUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      firestore.collection("feedback").add({
        displayName: displayName,
        email: email,
        message: msg,
      });
      alert("sent successfully");
      setdisplayName("");
      setEmail("");
      setMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="input"
          margin="dense"
          type="text"
          label="Full Name"
          color="secondary"
          fullWidth
          required
          value={displayName}
          onChange={(e) => setdisplayName(e.target.value)}
        />
        <TextField
          margin="dense"
          type="email"
          label="Email"
          fullWidth
          required
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          type="text"
          label="Enter Message"
          fullWidth
          multiline
          margin="dense"
          color="secondary"
          required
          value={msg}
          rowsMax={Infinity}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "25%", marginTop: "1rem" }}
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default ContactUs;
