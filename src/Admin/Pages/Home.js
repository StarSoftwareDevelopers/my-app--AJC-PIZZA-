import React, { useState, useEffect } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import {
  Divider,
  FormGroup,
  Grid,
  Switch,
  Typography,
  Container,
} from "@material-ui/core";
import { firestore } from "../../firebase/firebase.utils";
import Dashboard from "./../AdminComponents/Dashboard";
import CurrentDateOrders from "./../AdminComponents/Table/currentDateOrders";
import UpcomingOrdersTable from "./../AdminComponents/Table/UpcomingOrders";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Home = () => {
  const [meetAddress, setMeetAddress] = useState("");

  const [stat, setStat] = useState();

  useEffect(() => {
    firestore
      .collection("business")
      .doc("business-store")
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          setStat(doc.data());
        }
      });
  }, []);

  const [state, setState] = useState({
    checkedC: true,
  });

  const handleChange = async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    const value = event.target.checked;
    const status = value.toString();
    let setStatus = "";

    if (status === "true") {
      setStatus = "open";
    } else if (status.toString() === "false") {
      setStatus = "close";
    }

    console.log(setStatus);

    try {
      const res = await firestore
        .collection("business")
        .doc("business-store")
        .set({
          status: setStatus,
        })
        .then(() => {
          console.log("successfu;ll");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firestore
        .collection("business")
        .doc("pickUp-Address")
        .set({
          meetAddress: meetAddress,
        })
        .then(() => {
          console.log("successfull");
        });
    } catch (err) {
      console.log(err);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <input
              value={meetAddress}
              onChange={(e) => setMeetAddress(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>

          <FormGroup>
            <Typography component="div" variant="h6">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Close</Grid>
                <Grid item>
                  <AntSwitch
                    checked={state.checkedC}
                    onChange={handleChange}
                    name="checkedC"
                  />
                </Grid>
                <Grid item>Open</Grid>
              </Grid>
            </Typography>
          </FormGroup>
          <br />
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
