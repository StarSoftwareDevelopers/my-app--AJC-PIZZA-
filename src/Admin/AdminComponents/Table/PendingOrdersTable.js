import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";

//example of customBodyRender in muidatatable - https://gist.github.com/jsdaniell/096601f2b370509c475fdcae86e283ea

const PendingOrdersTable = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const unsubscribe = firestore
      .collection("orders")
      .where("orderStatus", "==", "Pending")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.docs.map((doc) =>
          arr.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setOrders(arr);
        console.log(arr);
        // console.log(JSON.stringify(arr));
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const columns = [
    "Order ID",
    "Order Date",
    "Delivery Date",
    "Address",
    "Customer Name",
    "Total Amount",
    "Order Status",
  ];

  const data = [];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div>
      <MUIDataTable
        title={"Pending Orders"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default PendingOrdersTable;
