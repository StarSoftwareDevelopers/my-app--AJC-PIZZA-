import React from "react";
import "./style.scss";
import Button from "./../../components/Forms/Button";
import { Typography, Divider } from "@material-ui/core";
import Itemized from "./Itemized";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, cartTotal } from "./../../Redux/Cart/cartHeader";
import { createStructuredSelector } from "reselect";

import ShopNow from "./../../pages/Go-Shop-Now-Page";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: cartTotal,
});

const MyCarting = ({}) => {
  const { cartItems, total } = useSelector(mapState);
  return (
    <div className="carter">
      <Typography variant="h3" align="center">
        My Cart
      </Typography>
      <div className="carts">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table
                    className="cartHead"
                    border="0"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Sum</th>
                        <th>Delete</th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* Separate */}
              <tr>
                <td>
                  <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                      {/* <tr> */}
                      {cartItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Itemized {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* {Separate} */}
              <tr>
                <td>
                  <table
                    align="right"
                    border="0"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr align="right">
                        <td>
                          <h3>Total: ₱ {total}.00</h3>
                          <Link to="/check-out">
                            <div style={{ float: "right" }}>
                              <Button>Check-out</Button>
                            </div>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <>
            <Divider />
            <ShopNow />
          </>
        )}
      </div>
    </div>
  );
};

export default MyCarting;
