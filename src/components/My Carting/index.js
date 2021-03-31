import React from "react";
import "./style.scss";
import Button from "./../../components/Forms/Button";
import Itemized from "./Itemized";
import { Link } from "react-router-dom";

const MyCarting = ({}) => {
  return (
    <div className="carter">
      <h1>MY CART ITEMS</h1>
      <div className="carts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <table
                className="cartHead"
                border="0"
                cellPadding="0"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
              </table>
            </tr>
            <tr>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <Itemized />
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
            <tr>
              <table align="right" border="0" cellPadding="10" cellSpacing="0">
                <tr align="right">
                  <td>
                    <h3>Total:</h3>
                  </td>
                </tr>
              </table>
            </tr>
          </thead>
        </table>
      </div>
      <Link to="/check-out">
        <Button>Checkout</Button>
      </Link>
    </div>
  );
};

export default MyCarting;
