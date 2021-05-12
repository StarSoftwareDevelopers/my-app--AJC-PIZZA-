import Container from "@material-ui/core/Container";
import OrderTable from "./../AdminComponents/Table/OrdersTable";

const Orders = () => {
  return (
    <Container
      maxWidth="lg"
      style={{
        margin: "1rem",
      }}
    >
      <OrderTable />
    </Container>
  );
};

export default Orders;
