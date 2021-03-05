import React from 'react';
import './style.scss';
import {Link} from 'react-router-dom';

import PizzaWelcome from './../../assets/pizzacarousel.png';
const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div 
                    className="item"
                    style={{
                        backgroundImage: `url(${PizzaWelcome})`
                    }}
                    >
                        <content>
                <items>
                <h1>AJC Homemade Pizza</h1>
                <p>The Best Pizza in Ayala</p>
                <Link to ="/dashboardC">
                    Order Now
                </Link>
                </items>
            </content>
                </div>
            </div>
        </div>
    );
}

export default Directory;