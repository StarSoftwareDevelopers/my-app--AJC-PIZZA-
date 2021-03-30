import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./check-out.scss";
import Button from "./../../components/Forms/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import TextField from "@material-ui/core/TextField";

import MuiPhoneNumber from "material-ui-phone-number";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const checkOut = (props) => {
  const { currentUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState(currentUser.displayName);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);
  return (
    <div>
      <Container fixed>
        <Typography
          component="div"
          style={{
            backgroundColor: "whitesmoke",
            height: "100vh",
            padding: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            borderRadius: "12px",
          }}
        >
          <table border="0" cellPadding="0" cellSpacing="0" className="center">
            <tr>
              <th>Order Details</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>Cart</td>
              <td>
                <ShoppingCartIcon
                  style={{ marginRight: "1rem", color: " #e31837" }}
                />
                1
              </td>
            </tr>
            <tr>
              <td>Pizza</td>
              <td>
                <PaymentIcon
                  style={{ marginRight: "1rem", color: " #e31837" }}
                />
                Price
              </td>
            </tr>
            <br></br>
            <tr>
              <td>Total</td>
              <td>Total Price</td>
            </tr>
          </table>
          <Card
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              padding: "2rem",
              marginTop: "2rem",
              height: "460px",
            }}
          >
            <Typography align="center" variant="h5" color="Secondary">
              Billing Details
            </Typography>
            <form>
              <TextField
                margin="dense"
                type="text"
                label="Full Name"
                value={currentUser.displayName}
                fullWidth
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                margin="dense"
                type="email"
                label="Email"
                disabled
                value={currentUser.email}
                fullWidth
                variant="outlined"
                color="secondary"
                required
              />
              <TextField
                margin="dense"
                type="text"
                label="Address"
                value={currentUser.address}
                color="secondary"
                fullWidth
                variant="outlined"
                required
              />
              <MuiPhoneNumber
                fullWidth
                name="phone"
                label="Phone Number"
                value={currentUser.phone}
                required
                color="secondary"
                data-cy="user-phone"
                defaultCountry={"ph"}
              />
              <TextField
                id="date"
                label="Delivery Date"
                type="date"
                color="secondary"
                fullWidth
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br></br>
              <br></br>
              <Typography align="center" variant="h5" color="Secondary">
                Payment Details
              </Typography>
              <Typography align="left" variant="subtitle1" color="Secondary">
                Choose Payment Option
              </Typography>

              <TextField
                margin="dense"
                id="gcash-num"
                color="secondary"
                label="Gcash Number"
                type="number"
                fullWidth
              />

              <Button className="btn">Place an Order</Button>
            </form>
          </Card>
        </Typography>
      </Container>
    </div>
  );
};

export default checkOut;
