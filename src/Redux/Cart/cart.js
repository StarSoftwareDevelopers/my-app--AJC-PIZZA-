export const existingItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.documentID === nextCartItem.documentID
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const itemExist = existingItem({ prevCartItems, nextCartItem });
  const counter = 1;

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
      // qty: 1,
      qty: counter,
    },
  ];
};
