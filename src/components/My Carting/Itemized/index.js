import React from 'react';
import Chicken from './../../../assets/chickenpizza.jpg';
import Tuna from './../../../assets/tunapizza.jpg';
import Vegetable from './../../../assets/vegetablepizza.jpg';
import Hawaiian from './../../../assets/hawaiianpizza.jpg';
import Button from './../../Forms/Button';

import './../style.scss';

const Itemized = ({}) => {
    return (
        <table className="cartItems" cellPadding="10" cellSpacing="0" border="0">
            <tbody>
                <tr>
                    <td>
                        <img src={Chicken} alt="chicken"/>
                    </td>
                    <td>
                        Chicken Pizza
                    </td>
                    <td>
                        <span>1</span>
                    </td>
                    <td>
                        ₱ 130.00
                    </td>
                    <td className="buttn">
                    <a>X</a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Itemized;