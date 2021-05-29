import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import {
  Button,
  Container,
  TextField,
  FormControl,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const MenuEdit = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state;

  const [editProduct, setEditProduct] = useState([]);
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDesc, setProductDesc] = useState();
  const [productImg, setProductImg] = useState();

  //go back to the previous path
  const goToPreviousPath = () => {
    history.goBack();
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("products")
      .doc(data)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });
        setEditProduct(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const timeStamp = new Date();
      const productsRef = firestore.collection("products").doc(data);
      const res = productsRef.set(
        {
          productName,
          productDesc,
          productPrice,
          productImg,
          // timeStamp,
        },
        { merge: true }
      );
      alert("Successfully updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={goToPreviousPath}
      >
        Back
      </Button>
      <br></br>
      <br></br>
      <Paper padding="5rem" elevation={3}>
        <br />
        <Typography variant="h4" align="center" color="secondary">
          Edit Product
        </Typography>
        <Container align="center" margin="0 auto">
          {editProduct.map((prod) => (
            <div>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <TextField
                    id="input"
                    type="text"
                    label="Product Name"
                    placeholder={prod.productName}
                    value={productName}
                    required
                    color="secondary"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setProductName(e.target.value)}
                  />

                  <TextField
                    id="input"
                    margin="dense"
                    type="text"
                    label="Product Price"
                    value={productPrice}
                    placeholder={prod.productPrice}
                    color="secondary"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />

                  <TextField
                    id="input"
                    margin="dense"
                    type="text"
                    label="Product Description"
                    placeholder={prod.productDesc}
                    value={productDesc}
                    color="secondary"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setProductDesc(e.target.value)}
                  />

                  <img
                    src={prod.productImg}
                    alt={prod.productName}
                    style={{ height: "150px" }}
                  />

                  <TextField
                    id="input"
                    margin="dense"
                    type="text"
                    placeholder="Enter Link"
                    label="Product Image"
                    value={productImg}
                    color="secondary"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setProductImg(e.target.value)}
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    style={{
                      borderColor: "#397D02",
                      color: "#397D02",
                      marginRight: "1rem",
                    }}
                  >
                    Update
                  </Button>
                  <br></br>
                  <br></br>
                </FormControl>
              </form>
            </div>
          ))}
        </Container>
      </Paper>
    </Container>
  );
};

export default MenuEdit;
