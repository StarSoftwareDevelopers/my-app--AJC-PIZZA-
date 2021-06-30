//order page
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
  Snackbar,
} from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch } from "react-redux";
import { addProduct } from "./../../../Redux/Cart/cartActions";

import Gallery from "./../../GridList";

//MUI-ALERT
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    display: "block",
    float: "left",
    marginLeft: "2rem",
  },
  media: {
    height: 200,
  },
  Card: {
    width: 275,
    transition: "transform 1s",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)", color: " #e31837" },
    textAlign: "center",
    justifyContent: "center",
  },
  Button: {
    color: " #fff",
    backgroundColor: "#e31837",
    "&:hover": {
      backgroundColor: " #ffc500",
      color: "#000",
    },
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
    slices,
    pizzaSize,
    isActive,
  } = product;

  const data = [product];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); //for MUI ALERT

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // container
        // direction="row"
        // justify="space-evenly"
        // alignItems="flex-start"
        // spacing={3}
      >
        {data.map((elem) => (
          <Grid
            item
            lg={6}
            sm={4}
            md={6}
            key={data.indexOf(elem)}
            style={{
              textAlign: "center",
            }}
          >
            <Card className={classes.Card}>
              <CardHeader title={productName} subheader={productDesc} />
              <CardMedia
                className={classes.media}
                image={productImg}
                title={productName}
              />

              <CardContent className={classes.Card}>
                <Typography variant="subtitle1" component="p" align="center">
                  {slices} slices, {pizzaSize} inches
                </Typography>
                <Typography variant="h6" component="p" align="center">
                  ₱ {productPrice}.00
                </Typography>
              </CardContent>
              <CardActions>
                {isActive === "true" ? (
                  <Button
                    {...configCart}
                    onClick={() => {
                      addToCart(product);
                      handleClick();
                    }}
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{ margin: "0 auto" }}
                    className={classes.Button}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    {...configCart}
                    onClick={() => {
                      addToCart(product);
                      handleClick();
                    }}
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{ margin: "0 auto" }}
                    className={classes.Button}
                    disabled
                  >
                    Unavailable
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Added to Cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Pizzas;
