import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//links
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

//core material-ui imports
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

//icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import GroupIcon from "@material-ui/icons/Group";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StoreIcon from "@material-ui/icons/Store";

//pages
import Home from "./../Pages/Home";
import Menu from "./../Pages/Menu";
import Users from "./../Pages/User";
import Feedback from "./../Pages/Feedback";
import "./../Admin.scss";
import Notifications from "../Pages/Notifications";
import Orders from "../Pages/Orders";

//AdminAuth
import AdminRoute from "./../AdminRoute/index";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    fontSize: "20px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            aria-label="account of current user"
            aria-controls="menu-appbar"
            className={classes.title}
            color="secondary"
          >
            <Link to="/admin">AJC HOMEMADE PIZZA</Link>
          </Typography>
          <div>
            <Typography
              color="secondary"
              noWrap
              variant="h5"
              style={{
                padding: "1rem",
              }}
            >
              Welcome, Admin
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        {/* {Back to Store} */}
        <Link to="/">
          <ListItem button key="Store">
            <ListItemIcon>
              <StoreIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h5">Back to Store</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        {/* {Back to Store} */}

        <Divider />
        <List>
          <Link to="/admin">
            <ListItem button key="Home">
              <ListItemIcon>
                <HomeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5">Home</Typography>
              </ListItemText>
            </ListItem>
          </Link>
          <Link to="/Menu">
            <ListItem button key="Menu">
              <ListItemIcon>
                <MenuBookIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5">Menu</Typography>
            </ListItem>
          </Link>
          <Link to="/Orders">
            <ListItem button key="Orders">
              <ListItemIcon>
                <ShoppingCartIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5">Orders</Typography>
            </ListItem>
          </Link>
          <Link to="/Notifications">
            <ListItem button key="Notifications">
              <ListItemIcon>
                <NotificationsIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5">Notifications</Typography>
            </ListItem>
          </Link>
          <Divider />
          <Link to="/AdminMgt">
            <ListItem button key="Admin">
              <ListItemIcon>
                <SupervisedUserCircleIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5">Admin</Typography>
            </ListItem>
          </Link>
          <Link to="/Staff">
            <ListItem button key="Staff">
              <ListItemIcon>
                <GroupIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5">Staff</Typography>
            </ListItem>
          </Link>
          <Link to="/Users">
            <ListItem button key="Users">
              <ListItemIcon>
                <PeopleOutlineIcon fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5">Users</Typography>
            </ListItem>
          </Link>
          <ListItem button key="LogOut">
            <ListItemIcon>
              <ExitToAppIcon fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5">Log Out</Typography>
          </ListItem>
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
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
            path="/Notifications"
            render={() => (
              <AdminRoute>
                <Notifications />
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
            path="/Feedback"
            render={() => (
              <AdminRoute>
                <Feedback />
              </AdminRoute>
            )}
          />
        </Switch>
      </main>
    </div>
  );
}
