//Cancelled Orders

import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";

class OrderTable extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Order Date",
    "Cancelled Date",
    "Total Amount",
  ];
  options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return <div>{rowData[2]}</div>;
    },
  };

  componentDidMount() {
    try {
      firestore
        .collection("orders")
        .where("orderStatus", "==", "Cancelled")
        .get()
        .then((snapshot) => {
          const orders = [];
          snapshot.docs.map((doc) => {
            const items = [];
            doc.data().items.forEach((item) => {
              items.push(`${item.productName}(${item.qty}),`);
            });
            const data = doc.data();
            orders.push({
              "Order ID": doc.id,
              Items: items,
              Name: data.displayName,
              "Total Amount": data.total,
              "Order Date": new Date(
                data.orderCreatedAt.seconds * 1000
              ).toLocaleString(),
              "Cancelled Date": new Date(
                data.orderCancelledAt.seconds * 1000
              ).toLocaleString(),
            });
          });
          this.setState({ orders: orders });
          // console.log(this.state.orders);
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <MUIDataTable
          title={"Cancelled Orders"}
          columns={this.columns}
          data={this.state.orders}
          options={this.options}
        />
      </div>
    );
  }
}
export default OrderTable;
