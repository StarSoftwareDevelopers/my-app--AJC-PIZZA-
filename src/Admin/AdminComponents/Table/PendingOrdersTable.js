import React, { Component } from "react";
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
    "Delivery Date",
    "Address",
    "Total Amount",
    "Phone",
    {
      name: "Confirm",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (data, dataIndex, rowIndex) => {
          return (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                console.log(data);
              }}
            >
              Confirm
            </Button>
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                console.log(tableMeta.tableData[tableMeta.index]);
              }}
            >
              Cancel
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

    // onRowClick: (rowData, rowState) => {
    //   console.log(rowData, rowState);
    // },
    // get row data and expand it
    // expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return <div>{rowData[2]}</div>;
    },
  };

  componentDidMount() {
    try {
      firestore
        .collection("orders")
        .where("orderStatus", "==", "Pending")
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
              "Delivery Date": new Date(
                data.deliveryDate.seconds * 1000
              ).toLocaleString(),
              Phone: data.phone,
            });
          });
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
