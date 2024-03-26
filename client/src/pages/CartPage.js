import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
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
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4">
                  {
                    <img
                      src={`${p.image}`}
                      className="w-100 object-fit-contain"
                    />
                  }
                </div>
                <div className="col-md-8">details</div>
              </div>
            ))}
          </div>
          <div className="col-md-3">Payment | Checkout</div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
