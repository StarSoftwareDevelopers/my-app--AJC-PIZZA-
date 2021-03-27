import React from "react";
import { InputAdornment } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import "./../Admin.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import MenuTable from "./../AdminComponents/Table/MenuTable";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
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
          display: "inline-block",
          marginRight: "1rem",
        }}
      >
        Menu
      </Typography>

      <Card style={{ padding: "1rem" }}>
        <Link to="#">
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add New Menu
          </Button>
        </Link>
        <br></br>
        <br></br>
        <MenuTable />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Add New Menu</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="product"
                label="Product Name"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                id="desc"
                label="Product Description"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"> ₱</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">.00</InputAdornment>
                  ),
                }}
              />
              <input type="file" name="myImage" accept="image/*" />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
};

export default Menu;
