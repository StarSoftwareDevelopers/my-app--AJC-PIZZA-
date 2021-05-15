import React, { useEffect, useState } from "react";
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
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import undraw_empty_cart_co35 from "./../../assets/undraw_empty_cart_co35.svg";

import { firestore } from "./../../firebase/firebase.utils";
import { useSelector } from "react-redux";

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
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
    margin: "0 auto",
  },
}));

const Cancelled = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //for pagination
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const noOfPages = orders.length / itemsPerPage;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("orders")
      .where("userID", "==", currentUser.id)
      .where("orderStatus", "==", "Cancelled")
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
                  {orders
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((order) => (
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
                            <Typography variant="h5" color="secondary">
                              Order was cancelled at:{" "}
                              {new Date(
                                order.orderCancelledAt.seconds * 1000
                              ).toLocaleString()}
                            </Typography>
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
                              <br />
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="secondary"
                    shape="rounded"
                    size="large"
                    showFirstButton
                    showLastButton
                    classes={{ ul: classes.paginator }}
                  />
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
    </div>
  );
};

export default Cancelled;