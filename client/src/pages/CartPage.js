import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [quantities, setQuantities] = useState({});
  const [product, setProduct] = useState([]);

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
    }));
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.token) {
      setAuth(authData);
    }
  }, []);

  if (!auth || !auth.token) {
    console.log("first");
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <table className="text-center table">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              {cart?.map((p, index) => (
                <tbody className="align-middle" key={index}>
                  <tr>
                    <td className="align-middle">{p.name}</td>
                    <td className="align-middle">
                      <img
                        src={p.image}
                        className="object-fit-contain"
                        style={{
                          width: "80px",
                          height: "70px",
                        }}
                        alt={p.name}
                      />
                    </td>
                    <td className="align-middle">${p.price}</td>
                    <td className="align-middle">
                      <div
                        className="input-group quantity mx-auto"
                        style={{ width: 100 }}
                      >
                        <div className="input-group-btn">
                          <button
                            className="btn btn-sm btn-primary btn-minus"
                            onClick={() => decreaseQuantity(p.id)}
                          >
                            -
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center"
                          value={quantities[p.id] || 1}
                          readOnly
                        />
                        <div className="input-group-btn">
                          <button
                            className="btn btn-sm btn-primary btn-plus"
                            onClick={() => increaseQuantity(p.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      ${p.price * (quantities[p.id] || 1)}
                    </td>
                    <td className="align-middle">
                      <button className="btn btn-sm btn-primary">Delete</button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="col-md-3">Payment | Checkout</div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
