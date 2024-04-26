import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useState([]);

  const getCartData = async () => {
    if (auth.user) {
      try {
        console.log(auth.user?.id);
        const { data } = await axios.get(`/api/v1/cart/get/${auth.user.id}`);
        if (data?.success) {
          const newV = data.cartItems;
          setCart(newV);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getCartData();
  }, [auth]);
  return (
    <CartContext.Provider value={[cart,setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
