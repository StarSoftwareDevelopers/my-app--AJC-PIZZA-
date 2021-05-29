//Cancelled Orders
import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import { withRouter } from "react-router-dom";

class OrderTable extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Address",
    "Cancelled Date",
    "Payment method",
    "Total Amount",
  ];
  options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
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
              Address: data.address,
              "Total Amount": data.total,
              "Cancelled Date": new Date(
                data.orderCancelledAt.seconds * 1000
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
export default withRouter(OrderTable);
