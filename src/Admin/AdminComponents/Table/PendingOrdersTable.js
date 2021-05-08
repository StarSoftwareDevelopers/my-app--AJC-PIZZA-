import React, { useEffect, useState, Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";
import { Button } from "@material-ui/core";

// https://stackoverflow.com/questions/60509294/react-muidatatable-trigger-going-to-a-different-page-after-a-row-is-clicked

//example of customBodyRender in muidatatable - https://gist.github.com/jsdaniell/096601f2b370509c475fdcae86e283ea
//expandable row - https://stackoverflow.com/questions/53993615/mui-datatable-expandable-rows
class PendingOrdersTable extends Component {
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
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                console.log("confirmed");
              }}
            >
              Confirmed
            </Button>
          );
        },
      },
    },
  ];
  options = {
    filter: true,
    selectableRows: "none",
    responsive: "simple",
    //get row data and expand it
    // expandableRows: true,
    // renderExpandableRow: (rowData, rowMeta) => {
    //   console.log(rowData, rowMeta);
    //   return <div>{rowData}</div>;
    // },
  };

  componentDidMount() {
    const unsubscribe = firestore
      .collection("orders")
      .where("orderStatus", "==", "Pending")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.docs.map((doc) =>
          arr.push({
            // ...doc.data(),
            "Order ID": doc.id,
            ...doc.data(),
          })
        );
        this.setState({ orders: arr });
        console.log(this.state.orders);
        // console.log(JSON.stringify(arr));
      });

    return () => {
      unsubscribe();
    };
  }

  render() {
    return (
      <div>
        <MUIDataTable
          title={"Pending Orders"}
          columns={this.columns}
          data={this.state.orders}
          options={this.options}
        />
      </div>
    );
  }
}
export default PendingOrdersTable;

// const PendingOrdersTable = () => {
//   const [orders, setOrders] = useState();

//   useEffect(() => {
//     const unsubscribe = firestore
//       .collection("orders")
//       .where("orderStatus", "==", "Pending")
//       .onSnapshot((snapshot) => {
//         const arr = [];
//         snapshot.docs.map((doc) =>
//           arr.push({
//             id: doc.id,
//             ...doc.data(),
//           })
//         );
//         setOrders(arr);
//         console.log(arr);
//         // console.log(JSON.stringify(arr));
//       });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const columns = [
//     "Order ID",
//     "Order Date",
//     "Delivery Date",
//     "Address",
//     "Customer Name",
//     "Total Amount",
//     "Order Status",
//   ];

//   const data = [];

//   const options = {
//     filterType: "checkbox",
//   };

//   return (
//     <div>
//       <MUIDataTable
//         title={"Pending Orders"}
//         data={data}
//         columns={columns}
//         options={options}
//       />
//     </div>
//   );
// };

// export default PendingOrdersTable;
