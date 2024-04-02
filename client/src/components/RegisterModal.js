import React, { useState } from "react";
import "../styles/AuthStyles.css";
import { Modal } from "antd";

const RegisterModal = ({
  open,
  setOpen,
  name,
  email,
  password,
  phone,
  address,
  setName,
  setEmail,
  setPassword,
  setPhone,
  setAddress,
  handleSubmit,
}) => {
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleModalSubmit = (e) => {
    handleSubmit(e);
  };
  return (
    <Modal open={open} onCancel={handleCancel} footer={null}>
      <form onSubmit={handleModalSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Phone"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Address"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
