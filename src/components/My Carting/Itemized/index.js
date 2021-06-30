import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  addProduct,
  lessenCartItem,
} from "./../../../Redux/Cart/cartActions";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./../style.scss";

const Itemized = (product) => {
  const dispatch = useDispatch();
  const { productName, productImg, productPrice, qty, documentID } = product;

  const removeItem = (documentID) => {
    dispatch(
      deleteProduct({
        documentID,
      })
    );
  };

  const addQty = (product) => {
    dispatch(addProduct(product));
  };

  const lessQty = (product) => {
    dispatch(lessenCartItem(product));
  };

  return (
    <table className="cartItems" cellPadding="10" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td>
            <img src={productImg} alt={productName} />
          </td>
          <td>
            <Typography variant="h6">{productName}</Typography>{" "}
          </td>
          <td>
            <IconButton onClick={() => lessQty(product)}>
              <ArrowBackIosIcon size="small" color="secondary" />
            </IconButton>
            <span>{qty}</span>
            <IconButton onClick={() => addQty(product)}>
              {<ArrowForwardIosIcon size="small" color="secondary" />}
            </IconButton>
          </td>
          <td>₱{productPrice}.00</td>
          <td>₱{qty * productPrice}.00</td>
          <td>
            <IconButton onClick={() => removeItem(documentID)}>
              <HighlightOffIcon fontSize="large" color="secondary" />
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Itemized;
