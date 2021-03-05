import React from 'react';
import Logo from './../../assets/AJC Pizza Logo.png';
import './style.scss';
import {
    FaFacebook,
    FaInstagram,
    FaTwitter
} from 'react-icons/fa';

import {
    FooterContainer,
    FooterWrap,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    SocialIcons,
    SocialIconsLink
} from './FooterElem';


const Footer = props => {
    return (
       <FooterContainer>
           <FooterWrap>
               <SocialMedia>
                   <SocialMediaWrap>
                       <SocialLogo>
                       <img src={Logo} alt="AJC Logo"/>
                       </SocialLogo>
                       <SocialIcons>
                       <SocialIconsLink href="/" target="_blank" aria-label="Facebook" rel="moopener noreferrer">
                           <FaFacebook />
                       </SocialIconsLink>
                       <SocialIconsLink href="/" target="_blank" aria-label="Instagram" rel="moopener noreferrer">
                           <FaInstagram />
                       </SocialIconsLink>
                       <SocialIconsLink href="/" target="_blank" aria-label="Twitter" rel="moopener noreferrer">
                           <FaTwitter />
                       </SocialIconsLink>
                       </SocialIcons>
                   </SocialMediaWrap>
               </SocialMedia>
           </FooterWrap>
       </FooterContainer>
                 
                    
    );
}

export default Footer;

/*import React from 'react';
import './style.scss';

const Footer = props => {
    return (
        <footer className="footr">
            <div className="wrap">
                AJC Pizza
            </div>
        </footer>
    );
}

export default Footer;*/