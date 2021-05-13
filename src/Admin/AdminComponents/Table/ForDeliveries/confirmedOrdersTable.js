import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../../firebase/firebase.utils";
import { Button, FormControlLabel, Snackbar } from "@material-ui/core";

// https://stackoverflow.com/questions/54616114/show-snackbar-material-ui-when-appear-erron-in-mutation

class ConfirmedOrdersTable extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Order Date",
    "Delivery Date",
    "Address",
    "Total Amount",

    "Phone",
    {
      name: "Preparing",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <FormControlLabel
              value={value}
              control={
                <Button
                  value={value}
                  variant="outlined"
                  style={{ borderColor: "#397D02", color: "#397D02" }}
                >
                  Preparing
                </Button>
              }
              onClick={(e) => {
                try {
                  firestore.collection("orders").doc(tableMeta.rowData[0]).set(
                    {
                      orderStatus: "Preparing",
                    },
                    { merge: true }
                  );
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          );
        },
      },
    },
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
        .where("orderStatus", "==", "Confirmed")
        .onSnapshot((snapshot) => {
          const orders = [];
          snapshot.docs.forEach((doc) => {
            const items = [];
            doc.data().items.forEach((item) => {
              items.push(`${item.productName}(${item.qty}),`);
            });
            const data = doc.data();
            orders.push({
              "Order ID": doc.id,
              Items: items,
              Name: data.displayName,
              "Order Date": new Date(
                data.orderCreatedAt.seconds * 1000
              ).toLocaleString(),
              Address: data.address,
              "Total Amount": data.total,
              "Delivery Date": new Date(
                data.deliveryDate.seconds * 1000
              ).toLocaleString(),
              Phone: data.phone,
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
    return this.state.orders ? (
      <div>
        <MUIDataTable
          title={"Confirmed Orders"}
          columns={this.columns}
          data={this.state.orders}
          options={this.options}
        />
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}
export default ConfirmedOrdersTable;
