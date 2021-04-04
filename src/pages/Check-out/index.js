import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./check-out.scss";
import { Card, Typography, Container, TextField } from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";

import MuiPhoneNumber from "material-ui-phone-number";

import FormButton from "./../../components/Forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const CheckingOut = (product) => {
  const { currentUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState(currentUser.displayName);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);

  const { productName, productImg, productPrice, qty, documentID } = product;
  return (
    <div>
      <Container fixed>
        <Typography
          component="div"
          style={{
            backgroundColor: "whitesmoke",
            height: "120vh",
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
              <td>Pizza :</td>
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
              height: "520px",
            }}
          >
            <Typography align="center" variant="h5" color="secondary">
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
              <br />
              <Typography align="center" variant="h5" color="secondary">
                Payment Details
              </Typography>
              <Typography align="left" variant="subtitle1" color="secondary">
                Choose Payment Option
              </Typography>
              <input type="radio" value="cod" name="paymentMethod" />{" "}
              COD(Cash-on-Delivery)<br></br>
              <input type="radio" value="gcash" name="paymentMethod" /> Gcash
              <TextField
                margin="dense"
                id="gcash-num"
                color="secondary"
                label="Gcash Number"
                type="number"
                fullWidth
              />
              <FormButton>Place an Order</FormButton>
            </form>
          </Card>
        </Typography>
      </Container>
    </div>
  );
};

export default CheckingOut;
