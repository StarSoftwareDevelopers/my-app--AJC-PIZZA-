import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import { firestore } from "./../../firebase/firebase.utils";

class OrderStatus extends Component {
  constructor() {
    super();
    this.state = { orders: [] };
  }

  //check again here

  // componentDidMount() {
  //   firestore
  //     .collection("orders")
  //     .get()
  //     .then((snapshot) => {
  //       const orders = [];
  //       snapshot.forEach((doc) => {
  //         const orderDocID = doc.id;
  //         const data = doc.data();
  //         data.order.orderItems.forEach((item) => {
  //           orders.push(item.productName, item.qty);
  //         });
  //       });
  //       this.setState({ orders: orders });
  //     });
  // }

  render() {
    return (
      <div>
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

            <Card
              style={{
                marginLeft: "10%",
                marginRight: "10%",
                padding: "2rem",
                marginTop: "2rem",
                // height: "450px",
              }}
            >
              <Typography variant="h4" align="center">
                {this.state.orders.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Typography>
              <Typography variant="h4" align="center">
                Order ID: <b> </b>
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
  }
}
export default OrderStatus;
