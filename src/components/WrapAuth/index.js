import React from 'react';
import './styles.scss'

const WrapAuth  = ({headLine, children}) => {
    return ( 
        <div className="wrapAuth">
            <div className="wrap">
                {headLine && <h2>{headLine}</h2>}

                <div className="children">
                    {children && children}
                </div>
            </div>
        </div>
     );
}
 
export default WrapAuth ;