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
