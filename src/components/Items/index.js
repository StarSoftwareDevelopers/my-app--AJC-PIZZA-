import React from "react";
import Item from "./Item";
import "./style.scss";
import { Typography, Card } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";

//From the cart
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "./../../Redux/Cart/cartHeader";

const mapCartItems = createStructuredSelector({
  items: selectCartItems,
});

const Items = ({}) => {
  const { items } = useSelector(mapCartItems);

  return (
    <div className="items">
      <Typography variant="h3" align="center">
        Menu Items
      </Typography>

      {items.length > 0 ? (
        <Card
          style={{
            marginRight: "0px",
            // position: "fixed",
            padding: "1rem",
            color: "#e31837",
            marginLeft: "1.5rem",
            width: "20%",
          }}
        >
          <Typography variant="h6">
            <ShoppingCartIcon /> Cart Items:
            {items.map((item, index) => (
              <tr key={(item, index)}>
                <td>
                  {item.productName}({item.qty})
                </td>
              </tr>
            ))}
          </Typography>
        </Card>
      ) : (
        <div></div>
      )}

      <Item />
    </div>
  );
};

export default Items;
