import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore, storage } from "./../../../firebase/firebase.utils";

class MUIMenuTable extends Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  columns = ["Products", "Product Image", "Description", "Price"];
  options = {
    filter: true,
    onRowsDelete: (e) => {
      console.log(e.data);
    },
    selectableRows: "single",
  };

  componentDidMount() {
    firestore
      .collection("Products")
      .get()
      .then((snapshot) => {
        const products = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          products.push({
            Products: data.productName,
            "Product Image": data.productImg,
            Description: data.productDesc,
            Price: data.productPrice,
          });
        });
        this.setState({ products: products });
        // console.log(snapshot)
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.state.products ? (
      <MUIDataTable
        title={"List of products"}
        columns={this.columns}
        data={this.state.products}
        options={this.options}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

export default MUIMenuTable;
