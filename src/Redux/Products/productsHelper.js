import { firestore } from "./../../firebase/firebase.utils";

//add product
export const addProductHandle = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//fetching of products
export const handleGetProduct = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .orderBy("createdDate")
      .get()
      .then((snapshot) => {
        const arrayProducts = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(arrayProducts);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//delete products
export const handleDelete = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//
export const handleFetch = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
