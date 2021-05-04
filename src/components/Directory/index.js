import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import PizzaWelcome from "./../../assets/pizzacarousel.png";
const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${PizzaWelcome})`,
          }}
        >
          <Typography variant="h1">AJC HOMEMADE PIZZA</Typography>
          <p>The Best Pizza in Ayala</p>
          <Link>Order Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
