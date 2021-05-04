import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
  Container,
  Divider,
} from "@material-ui/core/";

import PersonIcon from "@material-ui/icons/Person";

import vegetablepizza from "./../../assets/vegetablepizza.jpg";
import hawaiianpizza from "./../../assets/hawaiianpizza.jpg";
import tunapizza from "./../../assets/tunapizza.jpg";
import Button from "./../Forms/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    transition: "transform 1s",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)", color: " #e31837" },
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
  media: {
    height: 300,
    transition: "transform 1s",
    "&:hover": {
      transform: "scale(1.6)",
    },
  },
  avatar: {
    backgroundColor: "#e31837",
  },
  name: {},
});

const Gallery = () => {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <div>
          <Grid container spacing={4} className={classes.GridContainer}>
            <Grid item xs={12} sm={4}>
              <Card className={classes.root}>
                <CardHeader />

                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={vegetablepizza}
                    title="Chicken Pizza"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Chicken Pizza
                    </Typography>
                    <Typography variant="h6" className={classes.name}>
                      <PersonIcon />
                      Aelin Ashryver Galathynius
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="p"
                    >
                      The best pizza I ever tasted in my whole life. I would
                      recommend you to purchase AJC's very own pizzas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button>Order Now for only ₱130.00</Button>
                </CardActions>
              </Card>
            </Grid>
            {/* {Second part} */}
            <Grid item xs={12} sm={4}>
              <Card className={classes.root}>
                <CardHeader />
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={hawaiianpizza}
                    title="Hawiian Pizza"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Hawaiian Pizza
                    </Typography>
                    <Typography variant="h6" className={classes.name}>
                      <PersonIcon />
                      Rowan Whitethorn
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="p"
                    >
                      The best pizza I ever tasted in my whole life. I would
                      recommend you to purchase AJC's very own pizzas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button>Order Now for only ₱130.00</Button>
                </CardActions>
              </Card>
            </Grid>
            {/* {Third part} */}
            <Grid item xs={12} sm={4}>
              <Card className={classes.root}>
                <CardHeader />
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={tunapizza}
                    title="Tuna Pizza"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Tuna Pizza
                    </Typography>
                    <Typography variant="h6" className={classes.name}>
                      <PersonIcon />
                      James Herondale
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="p"
                    >
                      The best pizza I ever tasted in my whole life. I would
                      recommend you to purchase AJC's very own pizzas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button>Order Now for only ₱130.00</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Gallery;
