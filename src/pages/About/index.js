import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import StoreIcon from "@material-ui/icons/Store";
import DescriptionIcon from "@material-ui/icons/Description";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { green, orange, blue } from "@material-ui/core/colors";

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
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
  GridContainer: {
    padding: "10px",
  },
});

const About = () => {
  const classes = useStyles();
  return (
    <div>
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
                <Typography className={classes.title} gutterBottom>
                  <StoreIcon style={{ color: orange[500] }} /> About AJC
                  Homemade Pizza
                </Typography>
                <Typography variant="h6" align="justify">
                  AJC Homemade Pizza, a fairly new small-scale business whose
                  operation only started during the pandemic and was established
                  on June 18, 2020. The pizza industry in Ayala, Zamboanga City
                  is minimal, with only a few pizzas in place. We offer 4 kinds
                  of pizza which are Hawaiian, Chicken, Tuna, and Vegetables.
                  Our pizzas, made with their own secret recipe and a
                  hand-tossed dough, mixed with mozzarella, parmesan, and
                  cheddar cheese toppings that beguiles the customers to return.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  <VerifiedUserIcon style={{ color: green[500] }} /> Privacy
                  Policy
                </Typography>
                <Typography variant="h6" align="justify">
                  We care about data privacy and security. Please review our
                  Privacy Policy [CLICK HERE]/posted on the Site]. By using the
                  Site, you agree to be bound by our Privacy Policy, which is
                  incorporated into these Terms and Conditions. Please be
                  advised the site is hosted in the Philippines. If you access
                  the Site from the European Union, Asia, or any other region of
                  the world with laws or other requirements governing personal
                  data collection, use, or disclosure that differ from
                  applicable laws in the Philippines, then through your
                  continued use of the siye, you are transferring your data to
                  the Philippines, and you expressly consent to have your data
                  transferred to and processed in the Philippines.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  <DescriptionIcon style={{ color: blue[500] }} /> Terms of Use
                </Typography>
                <Typography variant="h6" align="justify">
                  These Terms and Conditions constitute a legally binding
                  agreement made between you, whether personally or on behalf of
                  an entity (Star Developers) and [AJC Pizza Online Ordering
                  System] Us, concerning your access to and use of the [website
                  name.com] website as well as any other media form, media
                  channel, mobile website or mobile application related, linked,
                  or otherwise connected thereto (collectively, the “Site”). You
                  agree that by accessing the Site, you have read, understood,
                  and agree to be bound by all of these Terms and Conditions. If
                  you do not agree with all of these Terms and Conditions, then
                  you are expressly prohibited from using the Site and you must
                  discontinue use immediately. Supplemental terms and conditions
                  or documents that may be posted on the Site from time to time
                  are hereby expressly incorporated herein by reference. We
                  reserve the right, in our sole discretion, to make changes or
                  modifications to these Terms and Conditions at any time and
                  for any reason. We will alert you about any changes by
                  updating the “Last updated” date of these Terms and
                  Conditions, and you waive any right to receive specific notice
                  of each such change. It is your responsibility to periodically
                  review these Terms and Conditions to stay informed of updates.
                  You will be subject to, and will be deemed to have been made
                  aware of and to have accepted, the changes in any revised
                  Terms and Conditions by your continued use of the Site after
                  the date such revised Terms and Conditions are posted. The
                  information provided on the Site is not intended for
                  distribution to or use by any person or entity in any
                  jurisdiction or country where such distribution or use would
                  be contrary to law or regulation or which would subject us to
                  any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Site from other locations do so on their own initiative and
                  are solely responsible for compliance with local laws, if and
                  to the extent local laws are applicable.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default About;
