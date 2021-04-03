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

export default Item;*/

/*import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './../../Forms/Button';
import { useDispatch } from 'react-redux';
import { addProduct } from './../../../Redux/Carting/cart.operations';

const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    documentID,
    productImg,
    productName,
    productPrice
  } = product;
  if (!documentID || !productImg || !productName ||
    typeof productPrice === 'undefined') return null;

  const configAddToCartBtn = {
    type: 'button'
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(
      addProduct(product)
    );
    history.push('/cart');
  };

  return (
    <div className="itemdes">
      <div className="pic">
        <Link to={`/product/${documentID}`}>
          <img src={productImg} alt={productName} />
        </Link>
      </div>

      <div className="pizzainfo">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>
                {productName}
              </Link>
            </span>
          </li>
          <li>
            <span className="pricee">
            ₱{productPrice}
            </span>
          </li>
          <li>
            <div className="addedtoCart">
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Product;*/



/*
import React, { useContext } from 'react';
import { ProductsContext } from './../../../Globe/ItemContext';
import { CartContext } from './../../../Globe/cartContext';

const Item = () => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    return (
        <>
            {products.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.productID}>
                        <div className='product-img'>
                            <img src={product.productImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.productName}
                        </div>
                        <div className='product-price'>
                            P {product.productPrice}.00
                    </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.productID, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Item;
*/
