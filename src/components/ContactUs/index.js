import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

// https://reactjs.org/docs/forms.html#controlled-components
//might need to check about formik

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const ContactUs = (props) => {
  const { currentUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <form>
        <TextField
          id="input"
          margin="dense"
          type="text"
          label="Full Name"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          margin="dense"
          type="email"
          label="Email"
          fullWidth
          color="secondary"
        />

        <TextField
          type="text"
          label="Enter Message"
          fullWidth
          multiline
          margin="dense"
          color="secondary"
          rowsMax={Infinity}
        />
        <Button
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
