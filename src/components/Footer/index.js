import React from "react";
import Logo from "./../../assets/AJC Pizza Logo.png";
import Typography from "@material-ui/core/Typography";
import "./style.scss";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import {
  FooterContainer,
  FooterWrap,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcons,
  SocialIconsLink,
} from "./FooterElem";

//
const Footer = (props) => {
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo>
              <img src={Logo} alt="AJC Logo" />
            </SocialLogo>
            <SocialIcons>
              <SocialIconsLink
                href="/"
                target="_blank"
                aria-label="Facebook"
                rel="moopener noreferrer"
              >
                <FaFacebook style={{ color: "#4267B2" }} />
              </SocialIconsLink>
              <SocialIconsLink
                href="/"
                target="_blank"
                aria-label="Instagram"
                rel="moopener noreferrer"
              >
                <FaInstagram style={{ color: "#fb3958" }} />
              </SocialIconsLink>
              <SocialIconsLink
                href="/"
                target="_blank"
                aria-label="Twitter"
                rel="moopener noreferrer"
              >
                <FaTwitter style={{ color: "#1DA1F2" }} />
              </SocialIconsLink>
              <Typography>(+63) 995-853-3250</Typography>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
