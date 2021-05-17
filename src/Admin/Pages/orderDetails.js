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
import jsPDF from "jspdf";

const useStyles = makeStyles({
  Paper: {
    padding: "1.5rem",
    width: "595px",
    height: "100%",
    margin: "0 auto",
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

  //go back to the previous path
  const goToPreviousPath = () => {
    history.goBack();
  };

  //generate PDF
  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4", "l", "letter");

    doc.html(document.querySelector("#pdf"), {
      callback: function (pdf) {
        pdf.save("mypdf.pdf");
      },
    });
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
            onClick={generatePdf}
          >
            Export to PDF
          </Button>
          <Typography variant="h4" align="center">
            Order Details
          </Typography>

          <Paper
            id="pdf"
            className={classes.Paper}
            elevation={3}
            style={{ overflowX: "auto" }}
          >
            {orders &&
              orders.map((order) => (
                <div key={order.id}>
                  <Typography variant="h4" align="center" color="secondary">
                    AJC HOMEMADE PIZZA
                  </Typography>
                  <br></br>
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
                              Php {item.productPrice}.00
                            </TableCell>
                            <TableCell align="right">
                              Php {`${item.productPrice}` * `${item.qty}`}.00
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow>
                          <TableCell rowSpan={3} />
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">
                            Php {order.total}.00
                          </TableCell>
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
