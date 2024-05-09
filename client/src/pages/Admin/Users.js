import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Form } from "antd";
import ProductForm from "../../components/Form/ProductForm";
import Table from "../../components/Table";
import DeleteModal from "../../components/DeleteModal";
// import RegisterModal from "../../components/RegisterModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [reload, setReload] = useState(false);
  const [fields, setFields] = useState([]);
  const [fieldsEdit, setFieldsEdit] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getSelected = (val) => {
    const keys = Object.keys(val);
    let updVal = { ...val };
    if (
      keys.length > 0 &&
      keys.includes("password") &&
      val["password"].length > 0
    ) {
      updVal = { ...updVal, password: "" };
    }
    return updVal;
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log("values", values);
      // const productData = new FormData();
      // productData.append("name", values.name);
      // productData.append("email", values.email);
      // productData.append("password", values.password);
      // productData.append("phone", values.phone);
      // productData.append("address", values.address);
      // console.log(productData)
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
      };
      console.log("UserData", userData);
      try {
        const res = await axios.post("/api/v1/auth/register", userData);
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          getAllUsers();
          setAddProductVisible(false);
          setReload(!reload);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          console.log("safasfsafasf");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Validate Failed:", error);
    }
  };

  const onFinishEdit = async (values) => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const userData = {
        name: values.name,
        password: values.password,
        phone: values.phone,
        address: values.address,
      };
      try {
        const { data } = await axios.put(
          `/api/v1/auth/edit-user/${selected.id}`,
          userData
        );
        if (data?.success) {
          toast.success("User Edited Successfully");
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

  // get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/user");
      if (data?.success) {
        setUsers(
          data?.user.map((usr) => {
            usr.role = usr.role === 1 ? "Admin" : "User";
            return usr;
          })
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Users");
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${id}`);
      if (data.success) {
        toast.success(`User is Deleted`);
        setDeleteLoading(false);
        getAllUsers();
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
    getAllUsers();
  }, [reload]);

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
        title: "Email",
        dataIndex: "email",
        type: "text",
        require: true,
        message: "Please Enter the Email",
        onTable: true,
        // onForm: true,
      },
      {
        title: "Address",
        dataIndex: "address",
        type: "text",
        require: true,
        message: "Please Enter the Address",
        onTable: true,
      },
      {
        title: "Password",
        dataIndex: "password",
        type: "password",
        require: true,
        message: "Please Enter the Password",
        onTable: false,
      },
      {
        title: "Phone",
        dataIndex: "phone",
        type: "text",
        require: true,
        message: "Please Enter the Phone",
        onTable: false,
      },
      {
        title: "Role",
        dataIndex: "role",
        type: "number",
        require: false,
        message: "Please Enter the Role",
        onTable: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        type: "button",
        onTable: true,
      },
    ]);

    setFieldsEdit([
      {
        title: "Name",
        dataIndex: "name",
        type: "text",
        require: true,
        message: "Please Enter the Name",
        onTable: true,
      },

      {
        title: "Address",
        dataIndex: "address",
        type: "text",
        require: true,
        message: "Please Enter the Address",
        onTable: true,
      },
      {
        title: "Password",
        dataIndex: "password",
        type: "password",
        require: true,
        message: "Please Enter the Password",
        onTable: false,
      },
      {
        title: "Phone",
        dataIndex: "phone",
        type: "text",
        require: true,
        message: "Please Enter the Phone",
        onTable: false,
      },
    ]);
  }, [users]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
            <button
              type="submit"
              className="btn btn-primary mb-4"
              onClick={() => {
                setAddProductVisible(true);
                form.resetFields([
                  "name",
                  "email",
                  "password",
                  "phone",
                  "address",
                ]);
              }}
            >
              Add User
            </button>
            <div className="w-75">
              <Table
                data={users}
                setEditProductVisible={setEditProductVisible}
                setSelected={setSelected}
                // handleDelete={handleDelete}
                formfields={fields}
                setOpenDeleteModal={setOpenDeleteModal}
                setDeleteId={setDeleteId}
              />
              <ProductForm
                onFinish={onFinish}
                // normFile={normFile}
                loading={loading}
                form={form}
                entry={{}}
                isEdit={addProductVisible}
                setEdit={setAddProductVisible}
                setProduct={setSelected}
                formFields={fields}
                formOpt={"create"}
              />
              <ProductForm
                onFinish={onFinishEdit}
                // normFile={normFile}
                loading={loading}
                form={form}
                entry={selected}
                isEdit={editProductVisible}
                setEdit={setEditProductVisible}
                setProduct={setSelected}
                formFields={fieldsEdit}
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
      </div>
    </Layout>
  );
};

export default Users;
