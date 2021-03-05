import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import CardFeedback from './../components/Card Feedback';

const HomeLayout = props => {
    return (
        <div className="peakheight">
            <Header {...props}/>
            <div className="main">
                {props.children}
                <CardFeedback/>
                <Footer />
            </div>
        </div>
    );
};

export default HomeLayout;