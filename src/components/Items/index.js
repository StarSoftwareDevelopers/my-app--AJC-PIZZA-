import React from "react";
import Item from "./Item";
import "./style.scss";
import { Typography } from "@material-ui/core";

const Items = ({}) => {
  return (
    <div className="items">
      <Typography variant="h3" align="center">
        Menu Items
      </Typography>
      <Item />
    </div>
  );
};

export default Items;
