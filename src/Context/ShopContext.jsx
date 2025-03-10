import react, { createContext, useState } from "react";
import all_products from "../assets/all_product";
export const ShopContext = createContext(null);

const getCartDefault = () => {
  let cart = {};
  for (let index = 0; index < all_products.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getCartDefault());
  
  const AddToCart = (id) => {
    setCartItem((prev) => {
      const updatedState = { ...prev, [id]: prev[id] + 1 };
      console.log(updatedState);
      return updatedState;
    });
  };

  const DecreaseFromCart = (id) => {
    setCartItem((prev) => {
      if (prev[id] && prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const newCart = { ...prev };
        delete newCart[id]; // Agar quantity 1 hai toh item remove karna hai
        return newCart;
      }
    });
  };
  

  const RemoveFromCart = (id) => {
    setCartItem((prev) => {
      const newCart = { ...prev };
      delete newCart[id]; // Sirf selected item remove karega
      return newCart;
    });
  };
  
  const ClearCart = () => {
    setCartItem(getCartDefault()); // Cart reset karega taaki structure maintain rahe
  };
      
  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItem[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getCartQuantity = () => {
    let totalQuantity = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalQuantity += cartItem[item];
      }
    }
    return totalQuantity;
  };

  const contextValue = {
    all_products,
    cartItem,
    AddToCart,
    RemoveFromCart,
    getCartTotalAmount,
    ClearCart,
    getCartQuantity,
    DecreaseFromCart
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
