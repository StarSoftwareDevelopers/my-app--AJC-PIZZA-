import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import { green, red, orange, blue } from "@material-ui/core/colors";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { Link } from "react-router-dom";
import { firestore } from "./../..//firebase/firebase.utils";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  GridContainer: {
    padding: "10px",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [size, setSize] = useState(null);
  const [pendingSize, setPendingSize] = useState(0);
  const [deliverySize, setDeliverySize] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  //useEffect for counting the total users registered
  useEffect(() => {
    firestore.collection("users").onSnapshot((snap) => {
      setSize(snap.size);
    });
  }, []);

  // for number of pending orders
  useEffect(() => {
    firestore
      .collection("orders")
      .where("orderStatus", "==", "Pending")
      .onSnapshot((snap) => {
        setPendingSize(snap.size);
      });
  }, []);

  // for number of for deliveries
  useEffect(() => {
    firestore
      .collection("orders")
      .where("orderStatus", "in", [
        "Confirmed",
        "Preparing",
        "On the way",
        "On the way(Delayed)",
      ])
      .onSnapshot((snap) => {
        setDeliverySize(snap.size);
      });
  }, []);

  useEffect(() => {
    var totalSales = 0;
    firestore
      .collection("orders")
      .where("orderStatus", "==", "Delivered")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          totalSales += doc.data().total;
        });
        setTotalSales(totalSales); //sales report
      });
  });

  return (
    <Card
      style={{
        padding: ".5rem",
        marginRight: "1.5rem",
      }}
    >
      <Grid container spacing={4} className={classes.GridContainer}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <AssessmentIcon style={{ color: blue[500] }} /> Total Sales
              </Typography>
              <Typography variant="h4" component="h2">
                ??? {totalSales}.00
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/Deliveries">
                <Button size="medium">
                  <Typography variant="h6" component="h2">
                    View All
                  </Typography>
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <ShoppingCartIcon style={{ color: red[500] }} /> Pending Orders
              </Typography>
              <Typography variant="h4" component="h2">
                {pendingSize}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/PendingOrders">
                <Button size="medium">
                  <Typography variant="h6" component="h2">
                    View All
                  </Typography>
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <LocalShippingIcon style={{ color: orange[500] }} /> For
                Deliveries
              </Typography>
              <Typography variant="h4" component="h2">
                {deliverySize}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/Deliveries">
                <Button size="medium">
                  <Typography variant="h6" component="h2">
                    View All
                  </Typography>
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <PeopleIcon style={{ color: green[500] }} /> Total Users
              </Typography>
              <Typography variant="h4" component="h2">
                {size}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/Users">
                <Button size="medium">
                  <Typography variant="h6" component="h2">
                    View All
                  </Typography>
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
}
