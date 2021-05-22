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
import {
  Card,
  Typography,
  Container,
  TextField,
  Divider,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import MuiPhoneNumber from "material-ui-phone-number";
import Button from "./../../components/Forms/Button";

import firebase from "firebase/app";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

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
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [payment, setPayment] = useState();
  const [gcash, setGcash] = useState("");
  const [pickUp, setPickUp] = useState();
  const [instruction, setInstructions] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [pickAddress, setPickAddress] = useState("");

  useEffect(() => {
    if (cartCount < 1) {
      history.push("/order-status");
    }
  }, [cartCount]);

  //convert firebase firestore date to Javascript date
  const date = firebase.firestore.Timestamp.fromDate(new Date(deliveryDate));
  const jsDate = date.toDate();
  const locale = jsDate.toLocaleString();

  //get local time zone and convert to minimum datetime-local
  const localTime = new Date();
  const minDate = moment(localTime).format("YYYY-MM-DDTHH:MM");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      firestore.collection("orders").doc().set({
        items,
        total,
        displayName: displayName,
        address: address,
        phone: phone,
        paymentMethod: payment,
        gcashNo: gcash,
        deliveryDate: date,
        orderCreatedAt: new Date(),
        userID: currentUser.id,
        orderStatus,
        instruction: instruction,
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
              // height: "520px",
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
                inputProps={{
                  min: `${minDate}`,
                }}
                required
              />
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={deliveryDate}
                  disablePast
                  label="Delivery Date"
                  fullWidth
                  showTodayButton
                  color="secondary"
                  onInputChange={e => setDeliveryDate(e.target.value)}
                  // onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </MuiPickersUtilsProvider> */}
              <br /> <br />
              <Typography align="center" variant="h5" color="secondary">
                Payment Details
              </Typography>
              <Divider />
              <Typography align="left" variant="subtitle1" color="secondary">
                Choose Payment Option
              </Typography>
              <input
                type="radio"
                value="cod"
                name="paymentMethod"
                onChange={(e) => setPayment(e.target.value)}
                required
              />
              COD(Cash-on-Delivery)<br></br>
              <input
                type="radio"
                value="gcash"
                name="paymentMethod"
                onChange={(e) => setPayment(e.target.value)}
              />
              Gcash<br></br>
              <input
                type="radio"
                value="pick-up"
                name="paymentMethod"
                onChange={(e) => setPayment(e.target.value)}
              />
              Pick-up
              {/* Show and hide depending on the radio button that was clicked */}
              {payment == "cod" && (
                <div>
                  <br />
                  <br />
                  <Typography variant="h6" align="left" color="secondary">
                    Please prepare this amount ₱{total}.00 on {locale}
                  </Typography>
                  <Divider />
                </div>
              )}
              {payment == "gcash" && (
                <TextField
                  margin="dense"
                  id="gcash-num"
                  color="secondary"
                  label="Gcash Number"
                  type="number"
                  fullWidth
                  required
                  value={gcash}
                  onChange={(e) => setGcash(e.target.value)}
                />
              )}
              {payment == "pick-up" && (
                <div>
                  <br />
                  <br />
                  <Typography variant="h6" align="left" color="secondary">
                    Please meet up at this place at ENTER PLACE on {locale}
                  </Typography>
                  <Divider />
                </div>
              )}
              <br /> <br />
              <Typography align="center" variant="h5" color="secondary">
                Delivery Instructions
              </Typography>
              <Divider />
              <TextField
                type="text"
                label="Delivery Instructions"
                fullWidth
                multiline
                margin="dense"
                rowsMax={Infinity}
                color="secondary"
                onChange={(e) => setInstructions(e.target.value)}
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
