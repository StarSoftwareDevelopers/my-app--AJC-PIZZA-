//Tabs for the deliveries
import React from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//orderStatus tables
import ConfirmedOrdersTable from "./Table/ForDeliveries/confirmedOrdersTable";
import PreparingOrdersTable from "./Table/ForDeliveries/preparingOrderTable";
import OnTheWayTable from "./Table/ForDeliveries/onthewayTable";

import DeliveredTable from "./Table/ForDeliveries/deliveredTable";

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
  },
  AppBar: {
    textAlign: "center",
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tab label="Confirmed" {...a11yProps(0)} />
          <Tab label="Preparing" {...a11yProps(1)} />
          <Tab label="On Delivery" {...a11yProps(2)} />
          <Tab label="delivered" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* Order Status for Confirmed Orders */}
        <ConfirmedOrdersTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Order status page for Preparing */}
        <PreparingOrdersTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OnTheWayTable />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <DeliveredTable />
      </TabPanel>
    </div>
  );
}
