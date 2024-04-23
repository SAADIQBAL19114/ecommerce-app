import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [auth,setAuth] = useAuth()
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const addToCart = async () => {
      try {
        console.log(auth.user.id);
        const { data } = await axios.get(`/api/v1/cart/get/${auth.user.id}`);
        if (data?.success) {
          const newV = data.cartItems.map((item) => item.Product);
          setCart(newV);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong in getting the cart items");
      }
    };
    addToCart();
  }, [auth]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
