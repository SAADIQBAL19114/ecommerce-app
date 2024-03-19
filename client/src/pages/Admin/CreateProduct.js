import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Select,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Button,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ProductForm from "../../components/Form/ProductForm";
import Table from "../../components/Table";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [image, setmage] = useState("");
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [reload, setReload] = useState(false);

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
  const getAllProducts = async () => {
    console.log("selected>>>>>>>", selected);
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
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async () => {
    console.log("inside OnFinish");
    try {
      const values = await form.validateFields();
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      productData.append("image", values.image[0].originFileObj);
      productData.append("categoryId", values.category);

      console.log("Product Data", productData);
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/api/v1/product/create-product",
          productData
        );

        console.log("productData", productData);
        if (data?.success) {
          toast.success("Product Created Successfully");
          setLoading(false);
          setAddProductVisible(false);
          setReload(true);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }

      console.log("Success:", values);
    } catch (error) {
      message.error("Validate Failed:", error);
    }
  };
  const compareValues = (product, formData) => {
    const updateProduct = {};
    if (formData.image) {
      updateProduct.image = formData.image;
    }
    const keys = Object.keys(product).filter((p) => p !== "image");
    for (let i = 0; i < keys.length; i++) {
      if (product[keys[i]] !== formData[keys[i]]) {
        updateProduct[keys[i]] = formData[keys[i]];
      }
    }

    return updateProduct;
  };

  const onFinishEdit = async (product) => {
    console.log("inside OnFinisEdit");
    console.log("selected", selected);
    try {
      // const values = await form.validateFields();
      // console.log(values);
      // const updVals = compareValues(product, values);
      // if (Object.keys(updVals).length === 0) {
      //   return;
      // }
      // const { name, description, price, quantity, image, category } = updVals;
      // const productData = new FormData();
      // name && productData.append("name", name);
      // description && productData.append("description", description);
      // price && productData.append("price", price);
      // quantity && productData.append("quantity", quantity);
      // image && productData.append("image", image[0].originFileObj);
      // category && productData.append("categoryId", values.category);

      // console.log("Product Data", productData);
      const values = await form.validateFields();
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      values.image[0].originFileObj
        ? productData.append("image", values.image[0].originFileObj)
        : productData.append("image", values.image[0].originFileObj);
      productData.append("categoryId", values.category);

      console.log("Product Data", productData);
      try {
        setLoading(true);
        const { data } = await axios.put(
          `/api/v1/product/edit-product/${selected.id}`,
          productData
        );
        setReload(true);
        setLoading(false);
        setEditProductVisible(false);
        console.log("productData", productData);
        if (data?.success) {
          toast.success("Product Edited Successfully");
          setLoading(false);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }

      console.log("Success:", values);
      setSelected({});
    } catch (error) {
      message.error("Validate Failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(`Product is Deleted`);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
            <button
              type="submit"
              className="btn btn-primary mb-4"
              onClick={() => setAddProductVisible(true)}
            >
              Add Product
            </button>
            <div className="w-75">
              <Table
                products={products}
                setEditProductVisible={setEditProductVisible}
                setSelected={setSelected}
                handleDelete={handleDelete}
              />
            </div>

            <ProductForm
              onFinish={onFinish}
              categories={categories}
              normFile={normFile}
              loading={loading}
              form={form}
              product={selected}
              isEdit={addProductVisible}
              setEdit={setAddProductVisible}
              setProduct={setSelected}
            />

            <ProductForm
              onFinish={onFinishEdit}
              categories={categories}
              normFile={normFile}
              loading={loading}
              form={form}
              product={selected}
              isEdit={editProductVisible}
              setEdit={setEditProductVisible}
              setProduct={setSelected}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
