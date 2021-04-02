import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./../../../Redux/Products/productActions";
import Pizzas from "./../Products";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Item = ({}) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const {} = useSelector;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="items">
      {products.map((products, pos) => {
        const { productName, productDesc, productImg, productPrice } = products;
        if (
          !productImg ||
          !productName ||
          !productDesc ||
          typeof productPrice === "undefined"
        )
          return null;

        const productList = {
          ...products,
        };

        return <Pizzas {...productList} />;
      })}
    </div>
  );
};

export default Item;
