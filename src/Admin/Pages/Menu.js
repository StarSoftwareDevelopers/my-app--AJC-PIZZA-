import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  getProducts,
  deleteProducts,
} from "./../../Redux/Products/productActions";

import EditIcon from "@material-ui/icons/Edit";

import {
  InputAdornment,
  Typography,
  Container,
  Card,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";
import "./../Admin.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { firesotre, firestore } from "../../firebase/firebase.utils";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Menu = () => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [slices, setSlices] = useState(0);
  const [pizzaSize, setPizzaSize] = useState(0);
  const isActive = "true";

  //for the first Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // --------------------------------------------------------------------
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
        slices,
        pizzaSize,
        isActive,
      })
    );
    resetForm();
  };

  const handleEdit = (data) => {
    history.push("/EditMenu", data);
  };

  const toInactive = (documentID) => {
    try {
      const ref = firestore.collection("products").doc(documentID);
      const res = ref.set(
        {
          isActive: "false",
        },
        { merge: true }
      );
      alert("Succesfull set to Inactive");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toActive = (documentID) => {
    try {
      const ref = firestore.collection("products").doc(documentID);
      const res = ref.set(
        {
          isActive: "true",
        },
        { merge: true }
      );
      alert("Succesfull set to Active");
      history.push("/");
    } catch (err) {
      console.log(err);
    }
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
                rowsMax={Infinity}
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
              />
              {/* ---------------------------------------------- */}
              <TextField
                margin="dense"
                id="desc"
                label="Number of slices"
                type="number"
                required
                color="secondary"
                value={slices}
                onChange={(e) => setSlices(e.target.value)}
                style={{ marginRight: "1.5rem" }}
              />

              <TextField
                margin="dense"
                id="desc"
                label="Size of Pizza"
                type="number"
                required
                color="secondary"
                value={pizzaSize}
                onChange={(e) => setPizzaSize(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">inches</InputAdornment>
                  ),
                }}
              />

              {/* ------------------------------------------------- */}
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"> ???</InputAdornment>
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
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose} color="secondary">
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
                          slices,
                          pizzaSize,
                          isActive,
                        } = product;
                        return (
                          <tr key={index}>
                            <td>
                              <img className="img" src={productImg} />
                            </td>
                            <td>{productName}</td>
                            <td>
                              {productDesc}
                              {<br />}
                              Slice: {slices}, Size: {pizzaSize} inches
                            </td>
                            <td>???{productPrice}.00</td>
                            <td>
                              {isActive === "true" ? (
                                <Button
                                  color="secondary"
                                  variant="outlined"
                                  onClick={() => toInactive(documentID)}
                                  style={{
                                    borderColor: "#397D02",
                                    color: "#397D02",
                                  }}
                                >
                                  Active
                                </Button>
                              ) : (
                                <p></p>
                              )}
                              {/* ---------------------------------- */}
                              {isActive === "false" ? (
                                <Button
                                  color="secondary"
                                  variant="outlined"
                                  onClick={() => toActive(documentID)}
                                >
                                  Inactive
                                </Button>
                              ) : (
                                <p></p>
                              )}
                            </td>
                            <td>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleEdit(documentID)}
                              >
                                <EditIcon fontSize="large" color="primary" />
                              </IconButton>
                            </td>
                            <td>
                              <IconButton
                                aria-label="delete"
                                // color="secondary"
                                style={{ color: " #d11a2a" }}
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
