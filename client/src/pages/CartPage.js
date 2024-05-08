import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import {useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [quantities, setQuantities] = useState({});
  const [maxQuantities, setMaxQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
console.log(">>><<<<<<<<>>>>>>>>>><<<<<<?????", auth);
  const navigate = useNavigate()
  const products = cart?.map((item) => item.Product);

  console.log(
    "cart>>>>>>>>>>",
    products.map((p) => p.id)
  );

  const fetchMaxQuantities = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/all-product");
      const maxQuantitiesData = {};
      console.log(data);
      data.product.forEach((product) => {
        maxQuantitiesData[product.id] = product.quantity;
      });
      setMaxQuantities(maxQuantitiesData);
      console.log("maxQuantitiesData", maxQuantitiesData);
    } catch (error) {
      console.error("Error fetching maximum quantities:", error);
    }
  };

  const initialQuantities = () => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.Product.id] = item.quantity;
    });
    setQuantities(initialQuantities);
    console.log("initialQuantities", initialQuantities);
  };

  const increaseQuantity = (productId) => {
    if (quantities[productId] < maxQuantities[productId]) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: (Number(prevQuantities[productId]) || 0) + 1,
      }));
    }
  };
  console.log("quantities", quantities);
  console.log("cart", cart);

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
    }));
  };

  const updateCart = async () => {
    try {
      let updatedCart = products.map((item) => ({
        productId: item.id,
        quantity: quantities[item.id] || 1,
      }));

      const { data } = await axios.put(
        `/api/v1/cart/update-cart/${auth.user.id}`,
        {
          cart: updatedCart,
        }
      );
      setCart(
        cart.map((cproduct) => {
          const updateQuantity = data.updatedCartItems.filter(
            (ci) => ci.id === cproduct.id
          );
          if (updateQuantity.length) {
            cproduct.quantity = updateQuantity[0].quantity;
          }
          return cproduct;
        })
      );
      toast.success("Cart updated successfully");
      // updateTotalAmount();
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };
  const deleteCartItem = async (productId) => {
    try {
      await axios.delete(
        `/api/v1/cart/delete-cart/${productId}/${auth.user.id}`
      );
      setCart(cart.filter((item) => item.Product.id !== productId));
      // updateTotalAmount();
      toast.success("Item removed from cart successfully");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { cart, totalAmount },
    });
  };

  useEffect(() => {
    initialQuantities();
    fetchMaxQuantities();
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      cart.map((p) => {
        if (p.productId === p.Product.id) {
          total += Number(p.quantity) * Number(p.Product.price);
        }
      });
      return total;
    };
    const updateTotalAmount = () => {
      const total = calculateTotalAmount();
      setTotalAmount(total);
    };
    updateTotalAmount();
  }, [cart]);

  const authLocalstorage = localStorage.getItem("auth")

  if (!authLocalstorage) {
    console.log("first");
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      {cart.length > 0 ? (
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
                {products?.map((p, index) => (
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
                              disabled={
                                quantities[p.id] === maxQuantities[p.id]
                              }
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
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => deleteCartItem(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              {cart.length > 0 && (
                <div className="row justify-content-end">
                  <div className="col-auto px-4">
                    <button
                      className="btn btn-sm btn-primary px-4"
                      onClick={updateCart}
                    >
                      Update Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3">
              <br />
              <h5>Payment | Checkout</h5>
              <hr />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Payment Method :
                  </p>
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    Cash on Delivery
                  </p>
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Total Amount :
                  </p>
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    ${totalAmount}
                  </p>
                </div>
                <br />
                <div className="row justify-content-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row" style={{ height: "75vh" }}>
          <div className="col-md-12 d-flex align-items-center justify-content-center">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name} Your Cart is Empty `}
            </h1>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;