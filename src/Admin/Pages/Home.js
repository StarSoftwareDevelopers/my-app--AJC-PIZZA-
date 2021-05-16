import React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dashboard from "./../AdminComponents/Dashboard";
import CurrentDateOrders from "./../AdminComponents/Table/currentDateOrders";
import UpcomingOrdersTable from "./../AdminComponents/Table/UpcomingOrders";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Home = () => {
  return (
    <div>
      <Container
        maxWidth="lg"
        style={{
          margin: "5px",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h5"
            style={{
              textAlign: "left",
              marginTop: "-20px",
              marginBottom: "1rem",
            }}
          >
            Overview
          </Typography>
          <Dashboard />
          <Divider style={{ marginTop: "1.5rem", marginBottom: ".5rem" }} />
          <CurrentDateOrders />
          <Typography
            variant="h5"
            style={{
              textAlign: "left",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            <Divider style={{ marginTop: "1.5rem", marginBottom: ".5rem" }} />
            <UpcomingOrdersTable />
          </Typography>
        </ThemeProvider>
      </Container>
    </div>
  );
};

export default Home;
