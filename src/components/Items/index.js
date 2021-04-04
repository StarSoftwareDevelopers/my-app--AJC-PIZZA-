import React from "react";
import Item from "./Item";
import "./style.scss";
import { Typography } from "@material-ui/core";

const Items = ({}) => {
  return (
    <div className="items">
      <Typography variant="h3" align="center">
        Menu Items
      </Typography>
      <Item />
    </div>
  );
};

export default Items;

/*import React, { useEffect }from 'react';
import { getProducts } from './../../Redux/Products/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import './style.scss';

const mapState = ({ productsData}) => ({
    products: productsData.products
});

const Items = ({}) => {

    const dispatch = useDispatch();
    const { products} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            getProducts()
        )
    }, []);

    if(!Array.isArray(products)) return null;

    if(products.length < 1) {
        return (
            <div className="items">
                <p>No results found</p>
            </div>
        )
    }

    return (
        <div className="items">

            <h1>Menu Items</h1><br></br>

            <div className="itemRes">
            {products.map((product, pos) => {
                const { productImg, productName, productDesc, productPrice } = product;
                if(!productImg || !productName || !productDesc || typeof productPrice === 'undefined') return null;

                const configProduct = {
                    ...product
                };

                return(
                    <Item {...configProduct} />
                );
            })}
            </div>
        </div>
    );
};

export default Items;*/

/*import React, { useEffect } from 'react';
import './../style.scss';
import { getProducts } from './../../../Redux/Products/productActions';
import { useSelector, useDispatch } from 'react-redux';

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Item = ({}) => {

  const { products } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts()
    )
  }, []);

if (!Array.isArray(products)) return null;

if (products.length < 1) {
  return (
    <div className="itemdes">
      <p>
        No Results Found.
      </p>

    </div>
  );
}

  return (
    <div className="itemdes">
      {products.map(( product, pos) => {
        const { productImg, productName, productPrice } = product;
        if (!productImg || productName || typeof productPrice ==='undefined') return null;

        return (
          <div key={pos}>
            {productName}
            {productPrice}
          </div>
        );
      })}
    </div>
  );
};

export default Item;*/

/*import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProducts } from './../../Redux/Products/productActions';
import Item from './Item';

import './style.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const ProductResults = ({ }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc } = products;

  useEffect(() => {
    dispatch(
      getProducts({ filterType })
    )
  }, [filterType]);

  

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>
          No search results.
        </p>
      </div>
    );
  }


  return (
    <div className="itemdes">

      <h1>
        Browse Products
      </h1>

      <div className="itemRes">
        {data.map((product, pos) => {
          const { productImg, productName, productPrice } = product;
          if (!productThumbnail || !productName ||
            typeof productPrice === 'undefined') return null;

          const configProduct = {
            ...product
          };

          return (
            <Item key={pos} {...configProduct} />
          );
        })}
      </div>

    </div>
  );
};

export default ProductResults;*/

/*
import React from 'react';
import Item from './Item';
import './style.scss';

const Items =( {} ) => {
    return (
        <div className="items">
            <h1>Menu Items</h1>
            <Item />
        </div>
        

    );
};

export default Items;*/
