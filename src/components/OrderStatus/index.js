import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Card,
  Grid,
  Divider,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";

import { firestore } from "./../../firebase/firebase.utils";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles((theme) => ({
  card: {
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
  header: {
    textAlign: "center",
    marginTop: "2rem",
  },
}));

const OrderStatus = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("orders")
      .where("userID", "==", currentUser.id)
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
      {isLoading ? (
        <div>
          <Typography variant="h3" className={classes.header}>
            My Orders
          </Typography>
          <Divider />
          {orders.map((order) => (
            <Grid key={order.id}>
              <Card className={classes.card}>
                <CardHeader title="Order ID " subheader={order.id} />
                <Typography variant="h5">Order Status:</Typography>
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
                            <li>Product Name: {item.productName}</li>
                            <li>Product Price: {item.productPrice}</li>
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
                    {order.paymentMethod.trim() === "cod" ? (
                      <Typography variant="h6">
                        Payment Method: COD (Cash-on-Delivery)
                      </Typography>
                    ) : (
                      <Typography variant="h6">
                        Payment Method: Gcash
                      </Typography>
                    )}
                    {/* {-------------------------------------------------------------------------} */}
                    {order.gcashNo.trim() === "" ? (
                      <p></p>
                    ) : (
                      <Typography variant="h6">
                        Gcash : {order.gcashNo}
                      </Typography>
                    )}
                    {/* {-------------------------------------------------------------------------} */}
                    Expected Delivery Date:{" "}
                    {new Date(order.deliveryDate.seconds * 1000).toDateString()}{" "}
                    at {""}
                    {new Date(
                      order.deliveryDate.seconds * 1000
                    ).toLocaleTimeString()}
                    <br />
                    Your orders will be delivered at: {order.address}
                  </Typography>
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
  );
};

export default OrderStatus;
