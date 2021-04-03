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

/*import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './../../Redux/Carting/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './style.scss';
import Button from './../Forms/Button';
import Itemized from './Itemized';

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const Checkout = ({ }) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);

  const errMsg = 'You have no items in your cart.';

  return (
    <div className="carter">
      <h1>
        Checkout
      </h1>

      <div className="carts">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="cartHead" border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th>
                          Product
                        </th>
                        <th>
                          Description
                        </th>
                        <th>
                          Quantity
                        </th>
                        <th>
                          Price
                        </th>
                        <th>
                          Remove
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
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
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                <h3>
                                  Total: ₱ {total}
                                </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <Button onClick={() => history.goBack()}>
                                    Continue Shopping
                                  </Button>
                                </td>
                                <td>
                                  <Button onClick={() => history.push('/check-out')}>
                                    Checkout
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
            <p>
              {errMsg}
            </p>
          )}
      </div>
    </div>
  );
};

export default Checkout;*/



