import React, { Component, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import { firestore } from "./../../firebase/firebase.utils";
import { useSelector } from "react-redux";

//class component to use the useSelector - https://stackoverflow.com/questions/64491841/how-to-use-useselector-in-a-class-based-component-react-redux
//https://stackoverflow.com/questions/63671237/how-to-get-document-id-of-firestore-in-react
//mapping an array - https://stackoverflow.com/questions/41027663/how-to-map-an-array-of-objects-in-react

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const OrderStatus = () => {
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState();

  useEffect(() => {
    const unsubscribe = firestore
      .collection("orders")
      .where("userID", "==", currentUser.id)
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.docs.map((doc) =>
          arr.push({
            id: doc.data(),
          })
        );
        setOrders(arr);
        console.log(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = firestore
  //     .collection("orders")
  //     .where("userID", "==", currentUser.id)
  //     .onSnapshot((snapshot) => {
  //       const userOrders = snapshot.docs.map((doc) => ({
  //         id: doc.data(),
  //       }));
  //       userOrders.forEach((item) => {
  //         const orderObj = {
  //           address: item.id.address,
  //           deliveryDate: item.id.deliveryDate,
  //         };
  //         setOrders(orderObj);
  //         console.log(orders);
  //       });
  //     });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div>
      {/* {orders.map((item, i) => (
        <li key={i}>
          {items}
          hello
        </li>
      ))} */}
      <Container fixed>
        <Typography
          component="div"
          style={{
            backgroundColor: "whitesmoke",
            // height: "100vh",
            padding: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h3" align="center">
            Order Status:
          </Typography>
          {/* <ul>
            {orders.map((order, index) => {
              <li key={index}>{order}</li>;
              console.log("orders", orders);
            })}
          </ul> */}

          <Card
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              padding: "2rem",
              marginTop: "2rem",
              // height: "450px",
            }}
          >
            <Typography variant="h4" align="center"></Typography>
            <Typography variant="h4" align="center">
              Order ID: <b></b>
            </Typography>
            <Typography variant="h4" align="center">
              Pizza: <b>{"Tuna Pizza "}</b>
            </Typography>
            <Typography variant="h4" align="center">
              Quantity: <b>{"1 "}</b>
            </Typography>

            <br></br>
            <Divider variant="middle" />
            <br></br>
            <Typography variant="h4" align="center">
              Total: <b></b>
            </Typography>
            <Typography variant="h4" align="center">
              Mode of Payment: <b> {" COD"}</b>
            </Typography>
            <Typography variant="h4" align="center">
              Expected Delivery Date: <b>{"12-20-2021 "}</b>
            </Typography>
          </Card>
        </Typography>
      </Container>
    </div>
  );
};

export default OrderStatus;
