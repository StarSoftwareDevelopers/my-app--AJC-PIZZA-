import React, { Component, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  Grid,
  Divider,
  CardHeader,
  CardContent,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  CardActions,
  IconButton,
  Collapse,
  Tooltip,
  Snackbar,
  Box,
} from "@material-ui/core";
import clsx from "clsx";

import MuiAlert from "@material-ui/lab/Alert";
import Button from "./../Forms/Button";
import Pagination from "@material-ui/lab/Pagination";

import CircularProgress from "@material-ui/core/CircularProgress";
import undraw_empty_cart_co35 from "./../../assets/undraw_empty_cart_co35.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  Content: {
    marginTop: "0",
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
    margin: "0 auto",
  },
  media: {
    height: "150px",
    width: "150px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const OrderStatus = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //for the pagination
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const rawPages = orders.length / itemsPerPage;
  const noOfPages = Math.ceil(rawPages);

  const handleChange = (event, value) => {
    setPage(value);
  };
  //for MUI ALERT
  const [open, setOpen] = React.useState(false);

  //for the expansion of card content
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);
  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  //----------------------------------------------

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
                    .map((order, i) => (
                      <Grid key={order.id}>
                        <Card className={classes.card}>
                          <CardHeader title={order.id} subheader="Order ID" />
                          <CardContent>
                            <Typography variant="h6" color="secondary">
                              Order Status: {order.orderStatus}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <Typography
                                variant="subtitle1"
                                color="textPrimary"
                              >
                                Expected Delivery Date:{" "}
                                {new Date(
                                  order.deliveryDate.seconds * 1000
                                ).toDateString()}{" "}
                                at {""}
                                {new Date(
                                  order.deliveryDate.seconds * 1000
                                ).toLocaleTimeString()}
                                <br />
                                Ship to: {order.address}
                                <br />
                                Total Amount: ???{order.total}.00
                                <br />
                                {order.remarks === "" ? (
                                  <p></p>
                                ) : (
                                  <Typography>
                                    Remarks: {order.remarks}
                                  </Typography>
                                )}
                                {order.instruction === "" ? (
                                  <p></p>
                                ) : (
                                  <Typography>
                                    Delivery Instructions: {order.instruction}
                                  </Typography>
                                )}
                              </Typography>
                              <Box justifyContent="flex-end" display="flex">
                                <Box p={1}>
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
                                </Box>
                              </Box>
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <Tooltip title="Show More">
                              <IconButton
                                className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded,
                                })}
                                onClick={() => handleExpandClick(i)}
                                aria-expanded={expandedId === i}
                                aria-label="show more"
                                color="secondary"
                                style={{ margin: "0 auto" }}
                              >
                                <ExpandMoreIcon fontSize="large" />
                              </IconButton>
                            </Tooltip>
                          </CardActions>
                          <Collapse
                            in={expandedId === i}
                            timeout="auto"
                            unmountOnExit
                          >
                            <CardContent>
                              <TableContainer>
                                <Table
                                  className={classes.table}
                                  aria-label="spanning table"
                                  style={{ minWidth: "340px" }}
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        colSpan={4}
                                        className={classes.cell}
                                      >
                                        Product Details
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        className={classes.cell}
                                      >
                                        Price
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Product Name</TableCell>
                                      <TableCell>Product Image</TableCell>
                                      <TableCell align="right">Qty.</TableCell>
                                      <TableCell align="right">Price</TableCell>
                                      <TableCell align="right">Sum</TableCell>
                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    {order.items.map((item) => (
                                      <TableRow key={item.documentID}>
                                        <TableCell>
                                          {item.productName}
                                        </TableCell>
                                        <TableCell>
                                          <img
                                            src={item.productImg}
                                            className={classes.media}
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          {item.qty}
                                        </TableCell>
                                        <TableCell align="right">
                                          Php {item.productPrice}.00
                                        </TableCell>
                                        <TableCell align="right">
                                          Php{" "}
                                          {`${item.productPrice}` *
                                            `${item.qty}`}
                                          .00
                                        </TableCell>
                                      </TableRow>
                                    ))}

                                    <TableRow>
                                      <TableCell rowSpan={2} />
                                      <TableCell colSpan={3} align="right">
                                        Delivery Fee
                                      </TableCell>
                                      <TableCell align="right">
                                        Free Delivery
                                      </TableCell>
                                    </TableRow>

                                    <TableRow>
                                      {/* <TableCell rowSpan={2} /> */}
                                      <TableCell colSpan={3} align="right">
                                        Total Amount
                                      </TableCell>
                                      <TableCell align="right">
                                        Php {order.total}.00
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell colSpan={4} align="right">
                                        Payment Method
                                      </TableCell>
                                      <TableCell align="right">
                                        {order.paymentMethod === "cod" ? (
                                          <Typography>
                                            COD (Cash-on-Delivery)
                                          </Typography>
                                        ) : (
                                          <Typography></Typography>
                                        )}
                                        {/* {-------------------------------------------------------------------------} */}
                                        {order.gcashNo === "" ? (
                                          <p></p>
                                        ) : (
                                          <Typography>
                                            Gcash({order.gcashNo})
                                          </Typography>
                                        )}
                                        {/* ---------------------------------------------------------- */}
                                        {order.paymentMethod === "pick-up" ? (
                                          <Typography>
                                            Pick Up at {order.meetUpAddress}
                                          </Typography>
                                        ) : (
                                          <Typography></Typography>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </CardContent>
                          </Collapse>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Order has been Cancelled!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OrderStatus;
