import React from "react";
import { Typography } from "@material-ui/core";
import Directory from "./../../components/Directory";
import Gallery from "./../../components/GridList";
import Divider from "@material-ui/core/Divider";

const Homepage = (props) => {
  return (
    <section className="homepage">
      <Directory className="directory" />
      <Typography variant="h4" align="center" style={{ marginTop: "2.5rem" }}>
        Gallery
      </Typography>
      <Divider variant="middle" />
      <br></br>
      <Gallery className="gallery" />
    </section>
  );
};

export default Homepage;
