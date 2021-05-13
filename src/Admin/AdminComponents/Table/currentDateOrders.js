//Today's orders

import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import moment from "moment";

class CurrentDateTable extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  columns = ["Order ID", "Name", "Items", "Delivery Date", "Total Amount"];
  options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return <div>{rowData[2]}</div>;
    },
  };

  //   `${(new Date().seconds * 1000).toLocaleString()}`
  //date range - https://stackoverflow.com/questions/47000854/firestore-query-by-date-range

  componentDidMount() {
    try {
      firestore
        .collection("orders")
        .where("orderStatus", "==", "Confirmed")
        .where(`${deliveryDate.toDateString()}`, "=", new Date().toDateString())
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

              "Delivery Date": new Date(
                data.deliveryDate.seconds * 1000
              ).toLocaleString(),
            });
          });
          console.log(orders);
          this.setState({ orders: orders });
          console.log(this.state.orders);
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <MUIDataTable
          title={"Today's Orders"}
          columns={this.columns}
          data={this.state.orders}
          options={this.options}
        />
      </div>
    );
  }
}
export default CurrentDateTable;
