import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const { state } = useLocation();
  const { totalAmount } = state;
  const { user } = auth;
  const [tempAddress, setTempAddress] = useState(user.address || "");
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    setTempAddress(e.target.value);
  };

  const checkoutButton = () => {
    handleCheckout();
    deleteCartQuantityFromProduct();
    deleteAllCartItems(user.id);
    navigate("/");
    toast.success("Your Order has been Placed");
  };

  const deleteAllCartItems = async (uId) => {
    try {
      const response = await axios.delete(`/api/v1/cart/delete-all/${uId}`);
      setCart([]);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart items:", error);
      throw error;
    }
  };
  const deleteCartQuantityFromProduct = async () => {
    try {
      const response = await axios.delete(
        "/api/v1/product/delete-quantity-of-cart",
        { data: cart }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting cart items:", error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    try {
      const orderData = cart.map((item) => ({
        ...item.Product,
        userId: item.userId,
        quantity: item.quantity,
        shippingAddress: tempAddress,
        email:user.email
      }));
      console.log("OrderData", orderData)
      const response = await axios.post(
        "/api/v1/order/add-to-order",
        orderData
      );

      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    console.log("authData", authData);
    if (authData) {
      setAuth(JSON.parse(authData));
    }
  }, []);

  return (
    <Layout>
      <div className="container m-2">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-5">Checkout</h2>
            <div className="row justify-content-around">
              <div className="col-md-6">
                <h4>Order Summary</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.Product.id}>
                        <td>{item.Product.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.Product.price}</td>
                        <td>${item.quantity * item.Product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-end">
                  <p className="fw-bold">Total: ${totalAmount}</p>
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="mb-3">Shipping Information</h4>
                <p>
                  <span style={{ fontWeight: "bold" }}> Name:</span> {user.name}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}> Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}> Address:</span>{" "}
                  {user.address}
                </p>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    <span style={{ fontWeight: "bold" }}>
                      Shipping Address:
                    </span>{" "}
                    (if shipping Address is different please write below)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={tempAddress}
                    onChange={handleAddressChange}
                  />
                </div>
                <button
                  className="btn btn-primary mt-3 ms-2"
                  onClick={checkoutButton}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
