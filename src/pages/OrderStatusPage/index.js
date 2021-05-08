import OrderStatus from "./../../components/OrderStatus";
import OrderTabs from "./../Order-Tabs/pending";
import { Typography, Divider } from "@material-ui/core";

const StatusPage = (props) => {
  return (
    <div style={{ margin: "1rem" }}>
      <Divider />
      <OrderTabs />
      {/* <OrderStatus />; */}
    </div>
  );
};

export default StatusPage;
