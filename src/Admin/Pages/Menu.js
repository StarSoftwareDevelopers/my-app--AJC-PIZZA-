import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  getProducts,
  deleteProducts,
} from "./../../Redux/Products/productActions";

import { InputAdornment } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import "./../Admin.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Menu = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState("");

  useEffect(() => {
    dispatch(getProducts(products));
  }, []);

  const resetForm = () => {
    setProductName("");
    setProductDesc("");
    setProductPrice(0);
    setProductImg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProducts({
        productName,
        productDesc,
        productPrice,
        productImg,
      })
    );
    resetForm();
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Add New Menu
          </Button>
        </Link>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >
          <form onSubmit={handleSubmit}>
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
                color="secondary"
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                margin="dense"
                id="desc"
                label="Product Description"
                type="text"
                fullWidth
                required
                color="secondary"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                color="secondary"
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
              <TextField
                type="text"
                label="Picture Link"
                fullWidth
                multiline
                margin="dense"
                rowsMax={Infinity}
                required
                color="secondary"
                onChange={(e) => setProductImg(e.target.value)}
              />
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
        <Typography variant="h4" align="center" color="secondary">
          List of Products
        </Typography>
        <div className="productTable">
          <table>
            <tbody>
              <tr>
                <th></th>
              </tr>
              <tr>
                <td>
                  <table border="0" cellPadding="10" cellSpacing="10">
                    <tbody>
                      {products.map((product, index) => {
                        const {
                          productName,
                          productDesc,
                          productImg,
                          productPrice,
                          documentID,
                        } = product;
                        return (
                          <tr key={index}>
                            <td>
                              <img className="img" src={productImg} />
                            </td>
                            <td>{productName}</td>
                            <td>{productDesc}</td>
                            <td>{productPrice}</td>
                            <td>
                              <IconButton
                                aria-label="delete"
                                color="secondary"
                                onClick={() =>
                                  dispatch(deleteProducts(documentID))
                                }
                              >
                                <DeleteForeverIcon fontSize="large" />
                              </IconButton>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </Container>
  );
};

export default Menu;
