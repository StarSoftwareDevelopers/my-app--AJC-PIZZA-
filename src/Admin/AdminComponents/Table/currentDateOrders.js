//Today's orders

import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import { FormControlLabel, Button, Select, MenuItem } from "@material-ui/core";
import firebase from "firebase/app";

class CurrentDateTable extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  columns = [
    "Order ID",
    "Name",
    "Items",
    "Delivery Date",
    "Total Amount",
    "Payment method",
    "Order Status",
    // {
    //   name: "Order Status",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta) => {
    //       return (
    //         // <FormControlLabel
    //         //   value={value}
    //         //   control={
    //         //     <Button
    //         //       value={value}
    //         //       variant="outlined"
    //         //       style={{ borderColor: "#397D02", color: "#397D02" }}
    //         //     >
    //         //       confirm
    //         //     </Button>
    //         //   }
    //         //   onClick={(e) => {
    //         //     try {
    //         //       firestore.collection("orders").doc(tableMeta.rowData[0]).set(
    //         //         {
    //         //           orderStatus: "Confirmed",
    //         //         },
    //         //         { merge: true }
    //         //       );
    //         //     } catch (err) {
    //         //       console.log(err);
    //         //     }
    //         //     // this.handleOpen();
    //         //   }}
    //         // />,
    //         <FormControlLabel
    //           value={value}
    //           control={
    //             <Select>
    //               <MenuItem value="">
    //                 <em>{tableMeta.rowData[5]}</em>
    //               </MenuItem>
    //               <MenuItem value={10}>Ten</MenuItem>
    //               <MenuItem value={20}>Twenty</MenuItem>
    //               <MenuItem value={30}>Thirty</MenuItem>
    //             </Select>
    //           }
    //         />
    //       );
    //     },
    //   },
    // },
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
              "Total Amount": data.total,
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
export default CurrentDateTable;
