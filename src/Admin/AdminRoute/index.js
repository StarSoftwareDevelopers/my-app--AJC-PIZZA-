import { withRouter } from "react-router-dom";
import AuthAdmin from "./AuthAdmin";

const AdminRoute = (props) => AuthAdmin(props) && props.children;

export default withRouter(AdminRoute);
