//Today's orders

import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import { FormControlLabel, Button, Select, MenuItem } from "@material-ui/core";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";

class CurrentDateTable extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }
  handleRowClick = (rowData, rowMeta) => {
    this.props.history.push("/details", `${rowData[0]}`);
  };

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Delivery Date",
    "Address",
    "Total Amount",
    "Payment method",
    "Order Status",
  ];
  options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
    onRowClick: this.handleRowClick,
  };

  componentDidMount() {
    // Javascript of setting the 0 hrs for start day
    var start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    var startOfDay = start.toLocaleDateString();
    // Javascript of setting the end hours for end day
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var endOfDay = end.toUTCString();

    //converting the JS start day to firebase timestamp
    var startDay = firebase.firestore.Timestamp.fromDate(new Date(startOfDay));
    //converting the JS end day to firebase timestamp
    var endDay = firebase.firestore.Timestamp.fromDate(new Date(endOfDay));

    try {
      firestore
        .collection("orders")
        .where("orderStatus", "in", [
          "Confirmed",
          "Preparing",
          "On the way",
          "On the way(Delayed)",
        ])
        .where("deliveryDate", ">=", startDay)
        .where("deliveryDate", "<=", endDay)
        .onSnapshot((snapshot) => {
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
              "Total Amount": ` ₱${data.total}.00`,
              Address: data.address,
              "Delivery Date": new Date(
                data.deliveryDate.seconds * 1000
              ).toLocaleString(),
              ...(data.paymentMethod == "gcash"
                ? {
                    "Payment method": `${data.paymentMethod.toUpperCase()}(${
                      data.gcashNo
                    })`,
                  }
                : {
                    "Payment method": data.paymentMethod.toUpperCase(),
                  }),
              "Order Status": data.orderStatus,
            });
          });
          this.setState({ orders: orders });
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        {/* still not working properly. Data does not update real-time */}
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
export default withRouter(CurrentDateTable);
