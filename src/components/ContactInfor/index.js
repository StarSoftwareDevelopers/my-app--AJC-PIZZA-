import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import StoreIcon from "@material-ui/icons/Store";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { green, orange, red } from "@material-ui/core/colors";

import ContactUs from "./../../components/ContactUs";

import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 300,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
      color: " #e31837",
    },
    backgroundColor: "whitesmoke",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
  GridContainer: {
    padding: "10px",
  },
  icon: {
    color: "#e31837",
    marginLeft: "1.5rem",
  },
  content: {
    fontSize: "18px",
    marginRight: "1rem",
    marginBottom: "1rem",
    alignItems: "center",
  },
});

const About = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={4} className={classes.GridContainer}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                <StoreIcon style={{ color: orange[500] }} /> Contact Information
              </Typography>
              <Typography className={classes.content}>
                <PhoneIcon className={classes.icon} />
                (+63) 995-853-3250
              </Typography>
              <Typography className={classes.content}>
                <LocationOnIcon className={classes.icon} />
                Zone 7, Ayala, Zamboanga City, Philippines 7000
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                <VerifiedUserIcon style={{ color: green[500] }} /> Open Hours
              </Typography>
              <Typography className={classes.content}>
                <ScheduleIcon className={classes.icon} />
                Mon-Sat 9:00 AM - 6:00PM
              </Typography>
              <Typography className={classes.content}>
                <ScheduleIcon className={classes.icon} />
                SUNDAY CLOSED
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                <ContactSupportIcon style={{ color: red[500] }} />
                Contact Us
              </Typography>
              <ContactUs />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
