import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, addProduct } from "./../../../Redux/Cart/cartActions";
import IconButton from "@material-ui/core/IconButton";
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

  // const addQty = (product) => {
  //   dispatch(
  //     addProduct({
  //       product,
  //     })
  //   );
  // };

  return (
    <table className="cartItems" cellPadding="10" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td>
            <img src={productImg} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <IconButton>
              <ArrowBackIosIcon size="small" color="secondary" />
            </IconButton>
            <span>{qty}</span>
            {/* {might not include muna this add qty} */}
            <IconButton>
              <ArrowForwardIosIcon size="small" color="secondary" />
            </IconButton>
          </td>
          <td>₱ {productPrice}</td>
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
