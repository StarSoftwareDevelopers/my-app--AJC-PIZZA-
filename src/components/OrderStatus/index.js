import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

const OrderStatus = (props) => {
  return (
    <div>
      <Container fixed>
        <Typography
          component="div"
          style={{
            backgroundColor: "whitesmoke",
            height: "100vh",
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
              height: "450px",
            }}
          >
            <br></br>
            <Typography variant="h4" align="center">
              Order ID: {" 10873876"}
            </Typography>
            <Typography variant="h4" align="center">
              Pizza: {"Tunna Pizza "}
            </Typography>
            <Typography variant="h4" align="center">
              Quantity: {"1 "}
            </Typography>
            <br></br>
            <Divider variant="middle" />
            <br></br>
            <Typography variant="h4" align="center">
              Total: {"130.00 "}
            </Typography>
            <Typography variant="h4" align="center">
              Mode of Payment: {" COD"}
            </Typography>
            <Typography variant="h4" align="center">
              Expected Delivery Date: {"12-20-2021 "}
            </Typography>
          </Card>
        </Typography>
      </Container>
    </div>
  );
};

export default OrderStatus;
