import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import OrderStatus from "../../components/OrderStatus/index";
import Deliveries from "../../components/OrderStatus/Deliveries";
import Completed from "../../components/OrderStatus/Completed";
import Cancelled from "../../components/OrderStatus/Cancelled";

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
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="On Delivery" {...a11yProps(1)} />
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
