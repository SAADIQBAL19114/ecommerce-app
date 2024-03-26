import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import Table from "../../components/Table";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [fields, setFields] = useState([]);

  // Create Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in Category Input Form");
    }
  };
  // Update Categroy
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected.id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  // Delete Category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        console.log("first");
        getAllCategories();
        toast.success(`category is Deleted`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
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

  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    setFields([
      {
        title: "Name",
        dataIndex: "name",
        type: "text",
        require: true,
        message: "Please Enter the Name",
        onTable: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        type: "button",
        onTable: true,
      },
    ]);
  }, [categories]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <Table
                data={categories}
                setEditProductVisible={setVisible}
                setUpdatedName={setUpdatedName}
                setSelected={setSelected}
                handleDelete={handleDelete}
                formfields={fields}
              />
              {/* <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c, index) => (
                    <tr key={index + 1}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                            console.log("c>>>>>>>>", c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
