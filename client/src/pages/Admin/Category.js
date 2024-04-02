import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import Table from "../../components/Table";
import DeleteModal from "../../components/DeleteModal";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [fields, setFields] = useState([]);
  const [reload, setReload] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

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
        
        setVisible(false)
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
        setEditVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  // Delete Category
  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`Category is Deleted`);
        setDeleteLoading(false);
        setOpenDeleteModal(false);
        getAllCategories();
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
  // get all categories
  const getAllCategories = async () => {
    try {
      const { status, data } = await axios.get("/api/v1/category/all-category");
      console.log(data, status);
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
  }, [reload]);
  useEffect(() => {
    setFields([
      {
        title: "Name",
        dataIndex: "name",
        type: "text",
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
            <button
              type="submit"
              className="btn btn-primary mb-4"
              onClick={() => {
                setVisible(true);
              }}
            >
              Add Category
            </button>
            <div className="w-75">
              <Table
                data={categories}
                setEditProductVisible={setEditVisible}
                setUpdatedName={setUpdatedName}
                setSelected={setSelected}
                formfields={fields}
                setOpenDeleteModal={setOpenDeleteModal}
                setDeleteId={setDeleteId}
              />
            </div>
          </div>
          <DeleteModal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            handleDelete={handleDelete}
            deleteId={deleteId}
            isLoading={deleteLoading}
          />
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
            setVisible={setVisible}
            visible={visible}
          />
          <CategoryForm
            handleSubmit={handleUpdate}
            value={updatedName}
            setValue={setUpdatedName}
            setVisible={setEditVisible}
            visible={editVisible}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
