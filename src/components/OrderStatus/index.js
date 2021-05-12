import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Snackbar,
  Card,
  Grid,
  Divider,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "./../Forms/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import undraw_empty_cart_co35 from "./../../assets/undraw_empty_cart_co35.svg";

import { firestore } from "./../../firebase/firebase.utils";
import { useSelector } from "react-redux";

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: "1",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    padding: "1rem",
    alignItems: "center",
  },
  media: {
    height: "150px",
    widht: "150px",
  },
  root: {
    display: "flex",
    float: "left",
  },
  Content: {
    marginTop: "-1.5rem",
    float: "right",
  },
}));

const OrderStatus = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false); //for MUI ALERT

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("orders")
      .where("userID", "==", currentUser.id)
      .where("orderStatus", "==", "Pending")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.docs.map((doc) =>
          arr.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setOrders(arr);
        setIsLoading(true);
        // setId(arr[0].id);
        // console.log("orders", arr);
        // console.log(arr[0].id);
        // console.log(JSON.stringify(arr));
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Divider />
      {isLoading ? (
        <div>
          {orders == 0 ? (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <img src={undraw_empty_cart_co35} style={{ height: "150px" }} />
              <p>No Orders Yet</p>
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div>
                  {orders.map((order) => (
                    <Grid key={order.id}>
                      <Card className={classes.card}>
                        <CardHeader title="Order ID " subheader={order.id} />
                        <Typography variant="h5" color="secondary">
                          Order Status: {order.orderStatus}
                        </Typography>
                        <br />
                        <div>
                          {order.items.map((item) => (
                            <ul key={item.documentID}>
                              <Typography variant="h5">
                                <div className={classes.root}>
                                  <li>
                                    <img
                                      src={item.productImg}
                                      alt={item.productName}
                                      className={classes.media}
                                    />
                                  </li>
                                  <div>
                                    <li>{item.productName}</li>
                                    <li>₱{item.productPrice}.00</li>
                                    <li>Quantity: {item.qty}</li>
                                  </div>
                                </div>
                              </Typography>
                            </ul>
                          ))}
                        </div>
                        <CardContent className={classes.Content}>
                          <Typography variant="h6">
                            {/* {-------------------------------------------------------------------------} */}
                            Order was created at: {""}
                            {new Date(
                              order.orderCreatedAt.seconds * 1000
                            ).toDateString()}{" "}
                            at{" "}
                            {new Date(
                              order.orderCreatedAt.seconds * 1000
                            ).toLocaleTimeString()}{" "}
                            <br />
                            {/* {-------------------------------------------------------------------------} */}
                            Total Orders: ₱{order.total}.00
                            <br />
                            {order.paymentMethod === "cod" ? (
                              <Typography variant="h6">
                                Payment Method: COD (Cash-on-Delivery)
                              </Typography>
                            ) : (
                              <Typography variant="h6">
                                Payment Method: Gcash
                              </Typography>
                            )}
                            {/* {-------------------------------------------------------------------------} */}
                            {order.gcashNo === "" ? (
                              <p></p>
                            ) : (
                              <Typography variant="h6">
                                Gcash : {order.gcashNo}
                              </Typography>
                            )}
                            {/* {-------------------------------------------------------------------------} */}
                            Expected Delivery Date:{" "}
                            {new Date(
                              order.deliveryDate.seconds * 1000
                            ).toDateString()}{" "}
                            at {""}
                            {new Date(
                              order.deliveryDate.seconds * 1000
                            ).toLocaleTimeString()}
                            <br />
                            Your orders will be delivered at: {order.address}
                          </Typography>
                          <Button
                            onClick={(e) => {
                              try {
                                firestore
                                  .collection("orders")
                                  .doc(order.id)
                                  .set(
                                    {
                                      orderStatus: "Cancelled",
                                      orderCancelledAt: new Date(),
                                    },
                                    { merge: true }
                                  );
                              } catch (err) {
                                console.log(err);
                              }
                              handleClick();
                            }}
                          >
                            Cancel Order
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: "center" }}>
                  Loading
                  <CircularProgress color="secondary" />
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <br />
          <Typography variant="h4">
            Loading... <CircularProgress color="secondary" fontSize=" large" />
          </Typography>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Order has been Cancelled!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OrderStatus;
