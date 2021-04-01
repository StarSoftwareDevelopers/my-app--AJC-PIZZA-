import React, { useState } from "react";
import { firestore, storage } from "../../firebase/firebase.utils";

import { InputAdornment } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import "./../Admin.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import MUIMenuTable from "./../AdminComponents/Table/MenuTableMUi";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Menu = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"];

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image either png or jpg");
    }
  };

  // add products
  const addProducts = (e) => {
    e.preventDefault();
    const upload = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
    upload.on(
      "img_upload",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        storage
          .ref("product-images")
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            firestore
              .collection("Products")
              .add({
                productName: productName,
                productDesc: productDesc,
                productPrice: productPrice,
                productImg: url,
              })
              .then(() => {
                alert("Product Added Successfuly");
                setProductName("");
                setProductPrice(0);
                setProductDesc("");
                setProductImg("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  const [open, setOpen] = useState(false);

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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >
          <form onSubmit={addProducts}>
            <DialogTitle id="form-dialog-title">Add New Menu</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="product"
                label="Product Name"
                type="text"
                fullWidth
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                margin="dense"
                id="desc"
                label="Product Description"
                type="text"
                fullWidth
                required
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
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
                required
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                id="file"
                type="file"
                name="myImage"
                accept="image/*"
                required
                onChange={productImgHandler}
              />
              {error & <span>{error}</span>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose} color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* <MenuTable /> */}
        <MUIMenuTable />
      </Card>
    </Container>
  );
};

export default Menu;