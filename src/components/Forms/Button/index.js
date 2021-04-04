import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    color: " #fff",
    backgroundColor: "#e31837",
    "&:hover": {
      backgroundColor: " #ffc500",
      color: "#000",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ButtonForm = ({ children, ...otherProps }) => {
  const classes = useStyles();
  return (
    <Typography align="center">
      <Button
        variant="contained"
        size="large"
        {...otherProps}
        className={classes.root}
      >
        {children}
      </Button>
    </Typography>
  );
};

export default ButtonForm;
