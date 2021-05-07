import { Link } from "react-router-dom";
import Button from "./../../components/Forms/Button";
import undraw_add_to_cart_vkjp from "./../../assets/undraw_add_to_cart_vkjp.svg";
import "./styles.scss";

const ShopNow = () => {
  return (
    <div className="container">
      <p>
        <img src={undraw_add_to_cart_vkjp} className="svg" />
      </p>

      <p style={{ color: " #e31837", fontSize: "20px", textAlign: "center" }}>
        No Items.
      </p>
      <Link to="/">
        <Button>go shop now</Button>
      </Link>
    </div>
  );
};

export default ShopNow;
