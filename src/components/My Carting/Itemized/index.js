import React from "react";
import Chicken from "./../../../assets/chickenpizza.jpg";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./../style.scss";

const Itemized = ({}) => {
  return (
    <table className="cartItems" cellPadding="10" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td>
            <img src={Chicken} alt="chicken" />
          </td>
          <td>Chicken Pizza</td>
          <td>
            <IconButton>
              <ArrowBackIosIcon size="small" color="secondary" />
            </IconButton>
            <span>1</span>
            <IconButton>
              <ArrowForwardIosIcon size="small" color="secondary" />
            </IconButton>
          </td>
          <td>₱ 130.00</td>
          <td>
            <IconButton>
              <HighlightOffIcon fontSize="large" color="secondary" />
            </IconButton>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Itemized;

/*import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem, addProduct, lessenCartItem } from './../../../Redux/Carting/cart.operations';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./../style.scss";

const Itemized = (product) => {
  const dispatch = useDispatch();
  const {
    productName,
    productImg,
    productPrice,
    quantity,
    documentID
  } = product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      deleteCartItem({
        documentID
      })
    );
  }

  const handleAddProduct = (product) => {
    dispatch(
      addProduct(product)
    )
  }

  const handleReduceItem = (product) => {
    dispatch(
      lessenCartItem(product)
    );
  }

  return (
    <table className="cartItems" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={productImg} alt={productName} />
          </td>
          <td>
            {productName}
          </td>
          <td>
            <span className="cartButtoning"
              onClick={() => handleReduceItem(product)}>
              {<IconButton>
              <ArrowBackIosIcon size="small" color="secondary" />
            </IconButton>}
            </span>
            <span>
              {quantity}
            </span>
            <span className="cartButtoning"
              onClick={() => handleAddProduct(product)}>
              {<IconButton>
              <ArrowForwardIosIcon size="small" color="secondary" />
            </IconButton>}
            </span>
          </td>
          <td>
            {productPrice}
          </td>
          <td align="center">
            <span className="cartButtoning remove" onClick={() => handleRemoveCartItem(documentID)}>
            <IconButton>
              <HighlightOffIcon fontSize="large" color="secondary" />
            </IconButton>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Itemized;*/



