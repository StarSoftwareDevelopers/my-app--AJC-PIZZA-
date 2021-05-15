import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import { Button, FormControlLabel, Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

// https://stackoverflow.com/questions/54616114/show-snackbar-material-ui-when-appear-erron-in-mutation

class PendingOrdersTable extends Component {
  constructor() {
    super();
    this.state = { orders: [], open: false };
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Order Date",
    "Delivery Date",
    "Delivery Time",
    "Address",
    "Total Amount",
    "Payment method",
    "Phone",
    {
      name: "Confirm",
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
                  confirm
                </Button>
              }
              onClick={(e) => {
                try {
                  firestore.collection("orders").doc(tableMeta.rowData[0]).set(
                    {
                      orderStatus: "Confirmed",
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
    {
      name: "Cancel",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (
          value,
          tableMeta,
          updateValue,
          dataIndex,
          rowIndex
        ) => {
          return (
            <FormControlLabel
              value={value}
              control={
                <Button value={value} variant="outlined" color="secondary">
                  Cancel
                </Button>
              }
              onClick={(e) => {
                try {
                  firestore.collection("orders").doc(tableMeta.rowData[0]).set(
                    {
                      orderCancelledAt: new Date(),
                      orderStatus: "Cancelled",
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

    // onRowClick: (rowData, rowState) => {
    //   console.log(rowData, rowState);
    // },
    // get row data and expand it
    // expandableRows: true,
    // renderExpandableRow: (rowData, rowMeta) => {
    //   console.log(rowData, rowMeta);
    //   return <div>{rowData[2]}</div>;
    // },
  };

  componentDidMount() {
    try {
      firestore
        .collection("orders")
        .where("orderStatus", "==", "Pending")
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
              ).toDateString(),
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
              ).toDateString(),
              "Delivery Time": new Date(
                data.deliveryDate.seconds * 1000
              ).toLocaleTimeString(),
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
    const { open } = this.state;
    return this.state.orders ? (
      <div>
        <MUIDataTable
          title={"Pending Orders"}
          columns={this.columns}
          data={this.state.orders}
          options={this.options}
        />
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
          Order Confirmed
        </Snackbar>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}
export default PendingOrdersTable;
