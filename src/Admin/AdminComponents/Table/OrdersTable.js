import React from "react";
import MUIDataTable from "mui-datatables";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, FormControl } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const OrderTable = () => {
  // const [ setValue] = React.useState("");
  const [status] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  // const handleClick = () => {
  //   window.confirm("Are you sure?")
  // };

  const columns = [
    "No.",
    "Order Date",
    "Delivery Date",
    "Order ID",
    "Customer Name",
    "Order Amount",
    "Payment Status",
    "Payment Amount",
    "View Details",
    "Order Status",
  ];

  const data = [
    [
      "1",
      "2/24/2020",
      "2/25/2020",
      "12345",
      "Aelin Galathynius",
      "₱130.00",
      "Pending",
      "₱130.00",
      <Button variant="outlined" color="primary">
        View
      </Button>,
      //  <FormControl>
      //   {/* <Select
      //       labelId="select-demo"
      //       id="status-select"
      //       value={status}
      //       onChange={handleChange}
      //     >
      //       {/* <option aria-label="None" value="" disabled/> */}
      //      <MenuItem value ={10} onClick={handleClickOpen}>Confirmed</MenuItem>
      //      <MenuItem value ={20}>Preparing</MenuItem>
      //      <MenuItem value ={30}>On the Way</MenuItem>
      //      <MenuItem value ={40}>On the Way (Delayed)</MenuItem>
      //      <MenuItem value ={50}>Delivered</MenuItem>
      //   </Select> */}
      // </FormControl>
    ],
    [
      "2",
      "2/24/2020",
      "2/25/2020",
      "12346",
      "Rowan Whitethorn",
      "₱130.00",
      "Pending",
      "₱130.00",
      <Button variant="outlined" color="primary">
        View
      </Button>,
    ],
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div>
      <Container maxWidth="lg">
        <MUIDataTable
          title={"Orders"}
          data={data}
          columns={columns}
          options={options}
        />
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Order Status"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Set the order status to "Confirmed"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClose} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderTable;
