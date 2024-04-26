import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const Checkout = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const { state } = useLocation();
  const { totalAmount } = state;
  const { user } = auth;
  console.log("user>>>>", user);


  const [tempAddress, setTempAddress] = useState(user.address || "");

  console.log(tempAddress)
  const handleAddressChange = (e) => {
    setTempAddress(e.target.value);
  };


  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Checkout</h2>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
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
            </div>
            <div className="mt-4">
              <h5 className="mb-3">Shipping Information</h5>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Address: {user.address}</p>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                 Shipping Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={tempAddress}
                  onChange={handleAddressChange}
                />
              </div>
              <button className="btn btn-primary mt-3 ms-2">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
