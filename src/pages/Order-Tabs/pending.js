import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box, Badge } from "@material-ui/core";

import OrderStatus from "../../components/OrderStatus/index";
import Deliveries from "../../components/OrderStatus/Deliveries";
import Completed from "../../components/OrderStatus/Completed";
import Cancelled from "../../components/OrderStatus/Cancelled";

import { firestore } from "./../../firebase/firebase.utils";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
  },
  AppBar: {
    textAlign: "center",
  },
  customBadge: {
    position: "absolute",
    top: "-3px",
    left: "3.5rem",
  },
  // customBadge2: {
  //   position: "absolute",
  //   top: "-3px",
  //   left: "5rem",
  // },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [value, setValue] = useState(0);
  const [pendingSize, setPendingSize] = useState(0);
  const [onDeliverySize, setOnDeliverySize] = useState(0);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    {
      setPendingSize == 0 ? setInvisible(!invisible) : setInvisible(invisible);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //useEffect to get number of pending orders
  useEffect(() => {
    firestore
      .collection("orders")
      .where("userID", "==", currentUser.id)
      .where("orderStatus", "==", "Pending")
      .onSnapshot((snap) => {
        setPendingSize(snap.size);
      });
  }, []);

  // useEffect to get number of on the way
  useEffect(() => {
    firestore
      .collection("orders")
      .where("userID", "==", currentUser.id)
      .where("orderStatus", "in", [
        "Confirmed",
        "Preparing",
        "On the way",
        "On the way(Delayed)",
      ])
      .onSnapshot((snap) => {
        setOnDeliverySize(snap.size);
      });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="scrollable auto tabs example"
          variant="fullWidth"
          centered
        >
          <Tab
            label={
              <Badge
                classes={{ badge: classes.customBadge }}
                badgeContent={pendingSize}
                color="secondary"
                checked={!invisible}
                onChange={handleBadgeVisibility}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography>Pending</Typography>
              </Badge>
            }
            {...a11yProps(0)}
          />

          <Tab
            label={
              <Badge
                classes={{ badge: classes.customBadge2 }}
                badgeContent={onDeliverySize}
                color="secondary"
                checked={!invisible}
                onChange={handleBadgeVisibility}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography>On Delivery</Typography>
              </Badge>
            }
            {...a11yProps(1)}
          />

          {/* <Tab label="On Delivery" {...a11yProps(1)} /> */}
          <Tab label="Completed" {...a11yProps(2)} />
          <Tab label="Cancelled" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {/* Order Status page for pending */}
        <OrderStatus />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Order status page for on Delivery */}
        <Deliveries />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Completed />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Cancelled />
      </TabPanel>
    </div>
  );
}
