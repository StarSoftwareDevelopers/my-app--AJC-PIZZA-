import { Switch, Route } from "react-router-dom";
import AdminRoute from "./../AdminRoute/index";

//pages
import Home from "./../Pages/Home";
import Menu from "./../Pages/Menu";
import Orders from "./../Pages/Orders";
import Users from "./../Pages/User";
import AdminMgt from "./../Pages/Admin";
import Staff from "./../Pages/Staff";
import Feedback from "./../Pages/Feedback";
import PendingOrders from "./../Pages/PendingOrders";
import Deliveries from "./../Pages/Deliveries";

const AdminLinks = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/admin"
          render={() => (
            <AdminRoute>
              <Home />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/Menu"
          render={() => (
            <AdminRoute>
              <Menu />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/Orders"
          render={() => (
            <AdminRoute>
              <Orders />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/PendingOrders"
          render={() => (
            <AdminRoute>
              <PendingOrders />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/Deliveries"
          render={() => (
            <AdminRoute>
              <Deliveries />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/Users"
          render={() => (
            <AdminRoute>
              <Users />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/AdminMgt"
          render={() => (
            <AdminRoute>
              <AdminMgt />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/Staff"
          render={() => (
            <AdminRoute>
              <Staff />
            </AdminRoute>
          )}
        />
        <Route
          exact
          path="/Feedback"
          render={() => (
            <AdminRoute>
              <Feedback />
            </AdminRoute>
          )}
        />
      </Switch>
    </div>
  );
};

export default AdminLinks;
