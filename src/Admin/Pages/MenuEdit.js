import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const MenuEdit = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state;
  const [editProduct, setEditProduct] = useState([]);

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
        console.log("edit", editProduct);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  //editing the products just use the similar const handleSubmit from the account page.

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={goToPreviousPath}
      >
        Back
      </Button>
      edit form
      {editProduct.map((prod, index) => (
        <div>
          <p>{prod.productName}</p>
          <p>{prod.productPrice}</p>
          <p>{prod.productDesc}</p>
          <img src={prod.productImg} alt={prod.productName} />
        </div>
      ))}
    </div>
  );
};

export default MenuEdit;
