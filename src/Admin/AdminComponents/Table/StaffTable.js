import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

class StaffTable extends Component {
  constructor() {
    super();
    this.state = { admin: [] };
  }

  columns = ["Display Name", "Email", "Address", "Phone Number"];
  options = {
    filter: true,
    selectableRows: "none",
  };

  render() {
    return this.state.admin ? (
      <MUIDataTable
        title={"List of Staff"}
        columns={this.columns}
        data={this.state.admin}
        options={this.options}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

export default StaffTable;
