import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.js";
import { useAuth } from "../context/auth.js";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox } from "antd";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const getAllProducts = async () => {
    console.log("inside GEt alll PRoducts");
    try {
      const { data } = await axios.get("/api/v1/product/all-product");
      if (data?.success) {
        setProducts(data?.product);
        console.log(data.product);
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
      if (data.success) {
        setCategories(data.category);
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
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column p-4">
            {categories?.map((c) => (
              <label key={c.id} className="checkbox-label">
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c.id)}
                />
                <span className="checkbox-text">{c.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(checked, null, 4)}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <div>
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
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">Add to Cart</button>
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
