import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [quantities, setQuantities] = useState({});

  const navigate = useNavigate();
  console.log("quantities", quantities);
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
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
