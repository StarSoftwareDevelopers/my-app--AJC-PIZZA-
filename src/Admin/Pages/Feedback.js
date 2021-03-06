import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import FeedbackTable from "./../AdminComponents/Table/FeedbackTable";

const Feedback = () => {
  return (
    <div>
      <Link to="/Users">
        <Typography
          variant="h5"
          display="inline"
          style={{ marginRight: "2rem" }}
        >
          Users
        </Typography>
      </Link>

      <Link to="/Feedback">
        <Typography variant="h5" display="inline">
          Feedback
        </Typography>
      </Link>
      <FeedbackTable />
    </div>
  );
};

export default Feedback;
