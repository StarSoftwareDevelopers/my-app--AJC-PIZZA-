import React from "react";
import { Typography } from "@material-ui/core";

import Directory from "./../../components/Directory";
import Gallery from "./../../components/GridList";

const Homepage = (props) => {
  return (
    <section className="homepage">
      <Directory className="directory" />
      <Typography variant="h4" align="center" style={{ marginTop: "2.5rem" }}>
        Gallery
      </Typography>
      <Gallery className="gallery" />
    </section>
  );
};

export default Homepage;
