import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { firestore } from "./../../firebase/firebase.utils";
import {
  Button,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Grid,
  Paper,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Divider,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useHistory } from "react-router-dom";

// https://www.youtube.com/watch?v=gW-ph8o_QKY

const useStyles = makeStyles({
  Paper: {
    padding: "1rem",
  },
  table: {
    minWidth: 650,
  },
  cell: {
    fontSize: "medium",
  },
});

const orderDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  const rowData = location.state;
  const [orders, setOrders] = useState([]);
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  // to get the order details
  useEffect(() => {
    const unsubscribe = firestore
      .collection("orders")
      .doc(rowData)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          id: snapshot.id,
          ...snapshot.data(),
        });
        setOrders(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Grid Container justify="center">
        <Grid item xs={12} style={{ padding: "8px" }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={goToPreviousPath}
          >
            Back
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<GetAppIcon />}
            style={{ float: "right" }}
          >
            Export to PDF
          </Button>
          <Typography variant="h4" align="center">
            Order Details
          </Typography>

          <Paper
            className={classes.Paper}
            elevation={3}
            style={{ overflowX: "auto" }}
          >
            {orders &&
              orders.map((order) => (
                <div key={order.id}>
                  <Typography variant="h6">Order ID: {order.id}</Typography>
                  <Typography variant="h6">
                    Delivery Date:{" "}
                    {new Date(
                      order.deliveryDate.seconds * 1000
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="h6">
                    Ship To: {order.displayName}
                  </Typography>
                  <Typography variant="h6">Ship At: {order.address}</Typography>
                  <Typography variant="h6">
                    Ship By: AHC HOMEMADE PIZZA
                  </Typography>
                  {/* ------------------------------------------------------------------- */}
                  <Divider />
                  {/* -------------------------------------------------------------------- */}

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
                            colSpan={3}
                            className={classes.cell}
                          >
                            Details
                          </TableCell>
                          <TableCell align="right" className={classes.cell}>
                            Price
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell align="right">Qty.</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Sum</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {order.items.map((item) => (
                          <TableRow key={item.documentID}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell align="right">{item.qty}</TableCell>
                            <TableCell align="right">
                              ₱{item.productPrice}.00
                            </TableCell>
                            <TableCell align="right">
                              ₱{`${item.productPrice}` * `${item.qty}`}.00
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">₱{order.total}.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default orderDetails;
