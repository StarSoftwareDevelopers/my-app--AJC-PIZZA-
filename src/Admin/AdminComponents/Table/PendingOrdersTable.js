import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import { Button, FormControlLabel } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class PendingOrdersTable extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      open: false,
    };
  }

  handleRowClick = (rowData, rowMeta) => {
    this.props.history.push("/details", `${rowData[0]}`);
  };

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
                e.stopPropagation();
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
        customBodyRender: (value, tableMeta) => {
          return (
            <FormControlLabel
              value={value}
              control={
                <Button value={value} variant="outlined" color="secondary">
                  Cancel
                </Button>
              }
              onClick={(e) => {
                e.stopPropagation();
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
    onRowClick: this.handleRowClick,
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
              "Total Amount": ` ???${data.total}.00`,
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
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}
export default withRouter(PendingOrdersTable);
