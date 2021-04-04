import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
} from "@material-ui/core";

const Staff = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Container
        maxWidth="lg"
        style={{
          margin: "1rem",
        }}
      >
        <Card style={{ padding: "1rem" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Add a Staff
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
          >
            <form>
              <DialogTitle id="form-dialog-title">Add Staff</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="product"
                  label="Name"
                  type="text"
                  fullWidth
                  required
                  color="secondary"
                />
                <TextField
                  margin="dense"
                  id="desc"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  color="secondary"
                />
                <TextField
                  margin="dense"
                  id="desc"
                  label="Address"
                  type="text"
                  fullWidth
                  required
                  color="secondary"
                  rowsMax={Infinity}
                />
                <TextField
                  margin="dense"
                  id="price"
                  label="Phone Number"
                  type="number"
                  fullWidth
                  color="secondary"
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" onClick={handleClose} color="secondary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Card>
      </Container>
    </div>
  );
};

export default Staff;
