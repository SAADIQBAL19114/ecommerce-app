import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { useCart } from "../context/cart";
import { Prices } from "../components/Prices.js";
import "../styles/HomePage.css";
import "../styles/ProductDetailsStyle.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkBoxState, setCheckBoxState] = useState(true);
  const [radio, setRadio] = useState([]);
  const [search, setSearch] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});


  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/all-product");
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Products");
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // reset filter
  const resetFilter = () => {
    // checkboxRef.current.unchecked;
    setChecked([]);
    setCheckBoxState(false);
    setRadio([]);
    setSearch("");
    // getAllProducts();
  };

  const addToCart =async(pId) => {
    try {
      const {data} = await axios.post(`/api/v1/cart/add-to-cart/${pId}/${auth.user.id}`);
      if (data?.success) {
        toast.success("Item Added to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Products");
    }
    
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      const filterProduct = async () => {
        try {
          const { data } = await axios.post("/api/v1/product/product-filter", {
            checked,
            radio,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };
      filterProduct();
    }
  }, [checked, radio]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3 mt-5 pt-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column p-4">
            {categories?.map((c) => (
              <label key={c.id} className="checkbox-label">
                <Checkbox
                  checked={checked.includes(c.id)}
                  onChange={(e) => handleFilter(e.target.checked, c.id)}
                />
                <span className="checkbox-text">{c.name}</span>
              </label>
            ))}
          </div>
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column p-4">
            <Radio.Group
              options={Prices.map((p) => {
                return { label: p.name, value: p.array };
              })}
              onChange={(e) => {
                console.log(e.target);
                setRadio(e.target.value);
              }}
              value={radio}
            ></Radio.Group>
          </div>
          <div className="d-flex flex-column p-4">
            <button className="btn btn-danger" onClick={resetFilter}>
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="">All Products</h1>
            </div>
            <div className="col-md-4">
              <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <label htmlFor="search" className="visually-hidden">
                    Search
                  </label>
                  <input
                    id="search"
                    type="text"
                    role="searchbox"
                    className="form-control"
                    placeholder="Search Items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {search === ""
              ? products?.map((p) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p.id}
                  >
                    <img
                      src={`${p.image}`}
                      className="card-img-top w-100"
                      style={{
                        objectFit: "contain",
                        maxHeight: "200px",
                        padding: "10px",
                      }}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.id}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => addToCart(p.id)}
                          disabled={disabledButtons[p.id]}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : filteredProducts?.map((p) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p.id}
                  >
                    <img
                      src={`${p.image}`}
                      className="card-img-top w-100"
                      style={{
                        objectFit: "contain",
                        maxHeight: "200px",
                        padding: "10px",
                      }}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.id}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => addToCart(p)}
                          disabled={disabledButtons[p.id]}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
