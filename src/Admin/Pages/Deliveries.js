import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import ViewDeliveries from "./../AdminComponents/Table/ViewDeliveries";

const Deliveries = () => {
  return (
    <div>
      <Container
        maxWidth="lg"
        style={{
          margin: "1rem",
        }}
      >
        <Typography
          variant="h5"
          style={{
            textAlign: "left",
            marginTop: "-20px",
            marginBottom: "1rem",
          }}
        >
          Deliveries
          <Typography style={{ float: "right" }}>
            <Link to="/PendingOrders">
              <Button variant="outlined" color="secondary">
                View Pending Orders
              </Button>
            </Link>
          </Typography>
        </Typography>
        <br />
        <ViewDeliveries />
      </Container>
    </div>
  );
};

export default Deliveries;
