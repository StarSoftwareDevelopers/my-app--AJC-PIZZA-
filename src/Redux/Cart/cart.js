export const existingItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.documentID === nextCartItem.documentID
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const counter = 1;
  const itemExist = existingItem({ prevCartItems, nextCartItem });

  if (itemExist) {
    return prevCartItems.map((cartItem) =>
      cartItem.documentID == nextCartItem.documentID
        ? {
            ...cartItem,
            qty: cartItem.qty + counter,
          }
        : cartItem
    );
  }

  return [
    ...prevCartItems,
    {
      
      ...nextCartItem,
      qty: counter,
    },
  ];
};

export const handleDelete = ({ prevCartItems, removeCartItem }) => {
  return prevCartItems.filter(
    (item) => item.documentID !== removeCartItem.documentID
  );
};
