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
