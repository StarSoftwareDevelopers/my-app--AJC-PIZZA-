//Today's orders

import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";

class UpcomingOrdersTable extends Component {
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
    // Javascript of setting the end hours for end day
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var endOfDay = end.toUTCString();

    //converting the JS end day to firebase timestamp
    var endDay = firebase.firestore.Timestamp.fromDate(new Date(endOfDay));

    try {
      firestore
        .collection("orders")
        .where("orderStatus", "in", [
          "Confirmed", //might add a order status of Pending
          "Preparing",
          "On the way",
          "On the way(Delayed)",
        ])
        .where("deliveryDate", ">=", endDay)
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
              "Delivery Date": new Date(
                data.deliveryDate.seconds * 1000
              ).toLocaleString(),
              Address: data.address,
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
          title={"Upcoming Orders "}
          columns={this.columns}
          data={this.state.orders}
          options={this.options}
        />
      </div>
    );
  }
}
export default withRouter(UpcomingOrdersTable);
