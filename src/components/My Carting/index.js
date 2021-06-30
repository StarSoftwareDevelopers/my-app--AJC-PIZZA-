import React from "react";
import "./style.scss";
import Button from "./../../components/Forms/Button";
import {
  Typography,
  Divider,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
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

const mapUserState = ({ user }) => ({
  currentUser: user.currentUser,
});

const MyCarting = ({}) => {
  const { cartItems, total } = useSelector(mapState);
  const { currentUser } = useSelector(mapUserState);
  return (
    <div className="carter">
      <Typography variant="h3" align="center">
        My Cart
      </Typography>
      <div className="carts">
        {cartItems.length > 0 ? (
          <TableContainer border="0" cellPadding="0" cellSpacing="0">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Table
                    className="cartHead"
                    border="0"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                          {" "}
                          <Typography variant="h5">Name</Typography>
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Typography variant="h5">Qty</Typography>
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Typography variant="h5">Price</Typography>
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Typography variant="h5">Sum</Typography>
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Typography variant="h5">Delete</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
              {/* Separate */}
              <TableRow>
                <TableCell>
                  <Table border="0" cellPadding="0" cellSpacing="0">
                    <TableBody>
                      {/* <tr> */}
                      {cartItems.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <Itemized {...item} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
              {/* {Separate} */}
              <TableRow>
                <TableCell>
                  <Table
                    align="right"
                    border="0"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <TableBody>
                      <TableRow align="right">
                        <TableCell align="right">
                          <h3></h3>
                          <Typography variant="h4">
                            Delivery Fee : Free Delivery{" "}
                          </Typography>
                          <Typography variant="h4">
                            Total: ₱ {total}.00
                          </Typography>
                          <Link to="/check-out">
                            <div style={{ float: "right" }}>
                              <Button>Check-out</Button>
                            </div>
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
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
