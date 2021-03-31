import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserTable from "./../AdminComponents/Table/UserTable";

const Users = () => {
  return (
    <div>
      <Link to="/Users">
        <Typography variant="h5">Users</Typography>
      </Link>
      <Link to="/Feedback">
        <Typography variant="h5" display="block">
          Feedback
        </Typography>
      </Link>
      <UserTable />
    </div>
  );
};

export default Users;
