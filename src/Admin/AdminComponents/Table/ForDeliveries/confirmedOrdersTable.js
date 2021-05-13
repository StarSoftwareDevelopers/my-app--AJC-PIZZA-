import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../../firebase/firebase.utils";
import { Button, FormControlLabel, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

class ConfirmedOrdersTable extends Component {
  constructor() {
    super();
    this.state = { orders: [], open: false };
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  handleClick = () => this.setState({ orders: [1], open: true });

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Order Date",
    "Delivery Date",
    "Address",
    "Total Amount",
    "Payment method",
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
                // this.handleOpen();
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
              ...(data.paymentMethod == "gcash"
                ? {
                    "Payment method": `${data.paymentMethod.toUpperCase()}(${
                      data.gcashNo
                    })`,
                  }
                : {
                    "Payment method": data.paymentMethod.toUpperCase(),
                  }),
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
        <div>
          {/* <Button variant="outlined" onClick={this.handleClick}>
            Open snackbar
          </Button> */}
          {/* {this.state.orders.length > 0 ? (
            <div>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={open}
                onClose={this.handleClose}
                autoHideDuration={2000}
                // other Snackbar props
              >
                <MuiAlert
                  onClose={this.handleClose}
                  severity="success"
                  elevation={6}
                  variant="filled"
                >
                  Successfully Set the order status to preparing!
                </MuiAlert>
              </Snackbar>
            </div>
          ) : (
            <p>Loading...</p>
          )} */}
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}
export default ConfirmedOrdersTable;
