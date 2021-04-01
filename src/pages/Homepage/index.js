import React from "react";
import { Typography } from "@material-ui/core";
import Directory from "./../../components/Directory";
import Gallery from "./../../components/GridList";
import Divider from "@material-ui/core/Divider";
import ContactInfoHome from "./../../components/ContactInfor";

const Homepage = (props) => {
  return (
    <section className="homepage">
      <Directory />
      <Typography variant="h4" align="center" style={{ marginTop: "2.5rem" }}>
        Gallery
      </Typography>
      <Divider variant="middle" />
      <br></br>
      <Gallery />
      <br></br>
      <Typography variant="h4" align="center" style={{ marginTop: "2.5rem" }}>
        Contact Us
      </Typography>
      {/* {Not sure whether to include this part} */}
      <Divider variant="middle" />
      <ContactInfoHome />
    </section>
  );
};

export default Homepage;
