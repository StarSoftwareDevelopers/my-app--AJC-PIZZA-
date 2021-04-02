import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import vegetablepizza from "./../../assets/vegetablepizza.jpg";
import hawaiianpizza from "./../../assets/hawaiianpizza.jpg";
import tunapizza from "./../../assets/tunapizza.jpg";

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
});

const Gallery = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={4} className={classes.GridContainer}>
      <Grid item xs={12} sm={4}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                A
              </Avatar>
            }
            title="Aelin Ashryver Galathynius"
            subheader="September 14, 2019"
          />
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
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                The best pizza I ever tasted in my whole life. I would recommend
                you to purchase AJC's very own pizzas.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/order">
              <Button variant="contained" size="small" color="secondary">
                Order Now
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>

      {/* {Second part} */}
      <Grid item xs={12} sm={4}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="Rowan Whitethorn"
            subheader="January 04, 2021"
          />
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
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                The best pizza I ever tasted in my whole life. I would recommend
                you to purchase AJC's very own pizzas.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/order">
              <Button variant="contained" size="small" color="secondary">
                Order Now
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
      {/* {Third part} */}
      <Grid item xs={12} sm={4}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="Julian Blackthorn"
            subheader="February 20, 2020"
          />
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
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                The best pizza I ever tasted in my whole life. I would recommend
                you to purchase AJC's very own pizzas.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/order">
              <Button variant="contained" size="small" color="secondary">
                Order Now
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Gallery;
