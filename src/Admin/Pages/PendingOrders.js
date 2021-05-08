import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@material-ui/core";
import PendingOrdersTable from "../AdminComponents/Table/PendingOrdersTable";

const PendingOrders = () => {
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
          Pending Orders
          <Typography style={{ float: "right" }}>
            <Link to="/Deliveries">
              <Button variant="outlined" color="secondary">
                View Deliveries
              </Button>
            </Link>
          </Typography>
        </Typography>
        <br />
        <PendingOrdersTable />
      </Container>
    </div>
  );
};

export default PendingOrders;
