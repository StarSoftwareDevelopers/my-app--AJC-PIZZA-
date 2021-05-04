import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import "./style.scss";
import { Typography, Card, Container } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import Button from "./../Forms/Button";

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
      <Typography variant="h3" align="center" style={{ marginTop: "2.5rem" }}>
        Order NOW!
      </Typography>
      <Typography variant="subtitle1" align="center">
        Click 'Add to Cart' to order
      </Typography>
      {items.length > 0 ? (
        <Card
          style={{
            marginRight: "0px",
            // position: "fixed",
            padding: "1rem",
            color: "#e31837",
            width: "20%",
            margin: "0 auto",
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
            <Link to="/cart">
              <Button>Continue to Cart</Button>
            </Link>
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
