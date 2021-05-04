import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  cartTotal,
  countCartItems,
  selectCartItems,
} from "./../../Redux/Cart/cartHeader";
import { firestore } from " ./../../src/firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { checkingOutCart } from "./../../Redux/Cart/cartActions";
import "./check-out.scss";
import { Card, Typography, Container, TextField } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import MuiPhoneNumber from "material-ui-phone-number";
import Button from "./../../components/Forms/Button";

import firebase from "firebase/app";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapCartItems = createStructuredSelector({
  total: cartTotal,
  cartCount: countCartItems,
  items: selectCartItems,
});

const CheckingOut = (product) => {
  const { total, cartCount, items } = useSelector(mapCartItems);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState(currentUser.displayName);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);
  const [deliveryDate, setDeliveryDate] = useState();
  const [payment, setPayment] = useState();

  useEffect(() => {
    if (cartCount < 1) {
      history.push("/order-status");
    }
  }, [cartCount]);

  const date = firebase.firestore.Timestamp.fromDate(new Date(deliveryDate));

  const handleSubmit = (event) => {
    event.preventDefault();

    // const order = {
    //   // totalOrders: total,
    //   orderItems: items.map((item) => {
    //     const { documentID, productImg, productName, productPrice, qty } = item;

    //     return {
    //       documentID,
    //       productImg,
    //       productName,
    //       productPrice,
    //       qty,
    //     };
    //   }),
    // };

    try {
      firestore.collection("orders").doc().set({
        items,
        total,
        displayName: displayName,
        address: address,
        phone: phone,
        payment: payment,
        deliveryDate: date,
        orderCreatedAt: new Date(),
        userID: currentUser.id,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch(checkingOutCart());
  };

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
            // marginBottom: "1rem",
            borderRadius: "12px",
          }}
        >
          <table border="0" cellPadding="0" cellSpacing="0" className="center">
            <tr align="center">
              <td>
                <h3>
                  <b>Order Details</b>
                </h3>
              </td>
            </tr>

            {items.map((item, index) => (
              <tr key={(item, index)} align="center">
                <td>
                  {item.productName}({item.qty})
                </td>
              </tr>
            ))}
            <br></br>
            <tr>
              <td>
                {" "}
                <PaymentIcon
                  style={{ marginRight: "1rem", color: " #e31837" }}
                />
                Total Price:
              </td>
              <td>₱{total}.00</td>
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
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                type="text"
                label="Full Name"
                placeholder={currentUser.displayName}
                value={displayName}
                fullWidth
                variant="outlined"
                color="secondary"
                required
                onChange={(e) => setdisplayName(e.target.value)}
              />
              <TextField
                margin="dense"
                type="text"
                label="Address"
                placeholder={currentUser.address}
                value={address}
                color="secondary"
                fullWidth
                variant="outlined"
                required
                onChange={(e) => setAddress(e.target.value)}
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
                onChange={(e) => setPhone(e)}
              />
              <TextField
                id="date"
                label="Delivery Date"
                type="datetime-local"
                color="secondary"
                fullWidth
                value={deliveryDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
              />
              <br /> <br />
              <Typography align="center" variant="h5" color="secondary">
                Payment Details
              </Typography>
              <Typography align="left" variant="subtitle1" color="secondary">
                Choose Payment Option
              </Typography>
              <input
                type="radio"
                value="cod"
                name="paymentMethod"
                onChange={(e) => setPayment(e.target.value)}
              />
              COD(Cash-on-Delivery)<br></br>
              <input
                type="radio"
                value="gcash"
                name="paymentMethod"
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              Gcash
              <TextField
                margin="dense"
                id="gcash-num"
                color="secondary"
                label="Gcash Number"
                type="number"
                fullWidth
              />
              <Typography align="center" style={{ marginTop: "1rem" }}>
                <Button type="submit">Place an Order</Button>
              </Typography>
            </form>
          </Card>
        </Typography>
      </Container>
    </div>
  );
};

export default CheckingOut;
