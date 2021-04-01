import React from "react";
import Chicken from "./../../../assets/chickenpizza.jpg";
import Tuna from "./../../../assets/tunapizza.jpg";
import Vegetable from "./../../../assets/vegetablepizza.jpg";
import Hawaiian from "./../../../assets/hawaiianpizza.jpg";

import "./../style.scss";

const Item = ({}) => {
  return (
    <div className="itemdes">
      <div className="itemRes">
        <div className="pic">
          <img src={Chicken} alt="chickenpizza" />
        </div>
        <div className="pizzainfo">
          <ul>
            <li>
              <span className="name">Chicken Pizza</span>
            </li>
            <li>
              <span className="pricee">₱ 130.00</span>
            </li>
            <li>
              <div className="addedtoCart">
                <div className="buttoning">Add to Cart</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="itemRes">
        <div className="pic">
          <img src={Hawaiian} alt="hawaiianpizza" />
        </div>
        <div className="pizzainfo">
          <ul>
            <li>
              <span className="name">Hawaiian Pizza</span>
            </li>
            <li>
              <span className="pricee">₱ 130.00</span>
            </li>
            <li>
              <div className="addedtoCart">
                <div className="buttoning">Add to Cart</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="itemRes">
        <div className="pic">
          <img src={Vegetable} alt="vegetablepizza" />
        </div>
        <div className="pizzainfo">
          <ul>
            <li>
              <span className="name">Vegetable Pizza</span>
            </li>
            <li>
              <span className="pricee">₱ 130.00</span>
            </li>
            <li>
              <div className="addedtoCart">
                <div className="buttoning">Add to Cart</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="itemRes">
        <div className="pic">
          <img src={Tuna} alt="tunapizza" />
        </div>
        <div className="pizzainfo">
          <ul>
            <li>
              <span className="name">Tuna Pizza</span>
            </li>
            <li>
              <span className="pricee">₱ 130.00</span>
            </li>
            <li>
              <div className="addedtoCart">
                <div className="buttoning">Add to Cart</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Item;

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
