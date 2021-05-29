import React, { useState, useEffect } from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import {
  Divider,
  Switch,
  Typography,
  Container,
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
  FormControl,
  IconButton,
  DialogContentText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
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
  const [stat, setStat] = useState();
  const [meetAddress, setMeetAddress] = useState();
  const [address, setAddress] = useState("");

  //for the dialog----------------------------------------------------------
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //for the dialog----------------------------------------------------------

  //--------------------------------------------------------------------------
  //get the data for the switch
  // useEffect(() => {
  //   firestore
  //     .collection("business")
  //     .doc("business-store")
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         console.log("No such document!");
  //       } else {
  //         setStat(doc.data());
  //       }
  //     });
  // }, []);

  // const [state, setState] = useState({
  //   checkedC: true,
  // });

  // const handleChange = async (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  //   const value = event.target.checked;
  //   const status = value.toString();
  //   let setStatus = "";

  //   if (status === "true") {
  //     setStatus = "open";
  //   } else if (status.toString() === "false") {
  //     setStatus = "close";
  //   }

  //   try {
  //     const res = await firestore
  //       .collection("business")
  //       .doc("business-store")
  //       .set({
  //         status: setStatus,
  //       })
  //       .then(() => {
  //         alert("Succesfully set!");
  //       });
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };
  //---------------------------------------------------------------------------------

  //-------------------------submission for the dialog--------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firestore
        .collection("business")
        .doc("pickUp-Address")
        .set({
          meetAddress,
        })
        .then(() => {
          // alert("Succesfully set!");
        });
    } catch (err) {
      console.log(err);
    }
  };

  //-------------------------submission for the dialog--------------------------------

  //-------------------------USEEFFECT FOR THE DIALOG/MEET UP ADDRESS----------------
  useEffect(() => {
    firestore
      .collection("business")
      .doc("pickUp-Address")
      .onSnapshot((doc) => {
        setAddress(doc.data());
      });
  }, []);
  //-------------------------USEEFFECT FOR THE DIALOG/MEET UP ADDRESS----------------

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

          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            set up meet up address
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Meet Up Address
              <IconButton onClick={handleClose}>
                <CloseIcon edge="end" color="secondary" />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{address.meetAddress}</DialogContentText>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <TextField
                    variant="outlined"
                    label="Enter meet up address"
                    color="secondary"
                    value={meetAddress}
                    rowsMax={Infinity}
                    fullWidth
                    onChange={(e) => setMeetAddress(e.target.value)}
                  />
                  <Button type="submit" color="secondary">
                    Submit
                  </Button>
                </FormControl>
              </form>
            </DialogContent>
          </Dialog>
          <br />
          {/* <FormGroup>
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
          </FormGroup> */}
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
