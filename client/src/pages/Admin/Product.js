import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Form } from "antd";
import ProductForm from "../../components/Form/ProductForm";
import Table from "../../components/Table";
import DeleteModal from "../../components/DeleteModal";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [form] = Form.useForm();
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [reload, setReload] = useState(false);
  const [fields, setFields] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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
    setLoading(true);

    try {
      const values = await form.validateFields();
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      productData.append("image", values.image[0].originFileObj);
      productData.append("categoryId", values.categoryId);

      try {
        const { data } = await axios.post(
          "/api/v1/product/create-product",
          productData
        );

        if (data?.success) {
          toast.success("Product Created Successfully");
          setAddProductVisible(false);
          setReload(!reload);
          setLoading(false);
        } else {
          toast.error(data?.message);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("Validate Failed:", error);
    }
  };
  const compareValues = (product, formData) => {
    const updateProduct = {};
    if (formData.image && formData.image.length) {
      updateProduct.image = formData.image;
    }
    const keys = Object.keys(product).filter(
      (p) => !["id", "image", "createdAt", "updatedAt"].includes(p)
    );
    for (let i = 0; i < keys.length; i++) {
      if (product[keys[i]] !== formData[keys[i]]) {
        updateProduct[keys[i]] = formData[keys[i]];
      }
    }

    return updateProduct;
  };

  const onFinishEdit = async (product) => {
    setLoading(true);

    try {
      const values = await form.validateFields();

      const updVals = compareValues(product, values);
      if (Object.keys(updVals).length === 0) {
        return;
      }
      const { name, description, price, quantity, image, categoryId } = updVals;
      const productData = new FormData();
      name && productData.append("name", name);
      description && productData.append("description", description);
      price && productData.append("price", price);
      quantity && productData.append("quantity", quantity);
      image && productData.append("image", image[0].originFileObj);
      categoryId && productData.append("categoryId", categoryId);
      try {
        const { data } = await axios.put(
          `/api/v1/product/edit-product/${selected.id}`,
          productData
        );
        if (data?.success) {
          toast.success("Product Edited Successfully");
          setReload(!reload);
          setLoading(false);
          setEditProductVisible(false);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }

      setSelected({});
    } catch (error) {
      toast.error("Validate Failed:", error);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(`Product is Deleted`);
        setDeleteLoading(false);
        getAllProducts();
        setOpenDeleteModal(false);
      } else {
        toast.error(data.message);
        setDeleteLoading(false);
      }
    } catch (error) {
      toast.error("something went wrong");
      setDeleteLoading(false);
      setOpenDeleteModal(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    setFields([
      {
        title: "Category",
        dataIndex: "categoryId",
        type: "select",
        data: categories,
        dataTitle: "name",
        require: true,
        message: "Please Select the Category",
        onTable: false,
      },
      {
        title: "Name",
        dataIndex: "name",
        type: "text",
        require: true,
        message: "Please Enter the Name",
        onTable: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        type: "textArea",
        require: true,
        message: "Please Enter the Description",
        onTable: false,
      },
      {
        title: "Price",
        dataIndex: "price",
        type: "number",
        require: true,
        message: "Please Enter the Price",
        onTable: true,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        type: "number",
        require: true,
        message: "Please Enter the Quantity",
        onTable: true,
      },
      {
        title: "Image",
        dataIndex: "image",
        type: "image",
        require: true,
        message: "Please add an image",
        onTable: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        type: "button",
        onTable: true,
      },
    ]);
  }, [products,categories]);

  useEffect(() => {
    getAllProducts();
  }, [reload]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Products</h1>
            <button
              type="submit"
              className="btn btn-primary mb-4"
              onClick={() => {
                setAddProductVisible(true);
                form.resetFields([
                  "name",
                  "categoryId",
                  "description",
                  "price",
                  "quantity",
                  "image",
                ]);
              }}
            >
              Add Product
            </button>
            <div className="w-75">
              <Table
                data={products}
                setEditProductVisible={setEditProductVisible}
                setSelected={setSelected}
                // handleDelete={handleDelete}
                formfields={fields}
                setOpenDeleteModal={setOpenDeleteModal}
                setDeleteId={setDeleteId}
              />
            </div>

            <ProductForm
              onFinish={onFinish}
              normFile={normFile}
              loading={loading}
              form={form}
              entry={selected}
              isEdit={addProductVisible}
              setEdit={setAddProductVisible}
              setProduct={setSelected}
              formFields={fields}
              formOpt={"create"}
            />

            <ProductForm
              onFinish={onFinishEdit}
              normFile={normFile}
              loading={loading}
              form={form}
              entry={selected}
              isEdit={editProductVisible}
              setEdit={setEditProductVisible}
              setProduct={setSelected}
              formFields={fields}
              formOpt={"edit"}
            />
            <DeleteModal
              open={openDeleteModal}
              setOpen={setOpenDeleteModal}
              handleDelete={handleDelete}
              deleteId={deleteId}
              isLoading={deleteLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
