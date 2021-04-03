import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Button,
  CardMedia,
  CardActions,
} from "@material-ui/core/";

import { useDispatch } from "react-redux";
import { addProduct } from "./../../../Redux/Cart/cartActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  media: {
    height: 300,
  },
  Card: {
    minWidth: 275,
    transition: "transform 1s",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)", color: " #e31837" },
    textAlign: "center",
  },
}));

const Pizzas = (product) => {
  const dispatch = useDispatch();
  const {
    documentID,
    productName,
    productDesc,
    productImg,
    productPrice,
  } = product;

  const data = [product];
  const classes = useStyles();

  if (
    !documentID ||
    !productImg ||
    !productName ||
    !productDesc ||
    typeof productPrice === "undefined"
  )
    return null;

  const configCart = {
    type: "button",
  };

  const addToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    alert("Added to cart");
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {data.map((elem) => (
          <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
            <Card className={classes.Card}>
              <CardHeader title={productName} subheader={productDesc} />
              <CardMedia
                className={classes.media}
                image={productImg}
                title={productName}
              />

              <CardContent className={classes.Card}>
                <Typography variant="h6" component="p" align="center">
                  ₱ {productPrice}.00
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  {...configCart}
                  onClick={() => addToCart(product)}
                  variant="contained"
                  size="large"
                  color="secondary"
                  style={{ margin: "0 auto" }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pizzas;
