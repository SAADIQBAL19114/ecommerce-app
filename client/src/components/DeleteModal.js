import React, { useState } from "react";
import { Button, Modal, Flex } from "antd";
import { toast } from "react-toastify";

const DeleteModal = ({
  open,
  setOpen,
  deleteId,
  handleDelete,
  isLoading,
}) => {
  const [modalText, setModalText] = useState("Are you sure ?");

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleOk = () => {
    handleDelete(deleteId);
  };
  return (
    <>
      <Modal open={open} footer={false} onCancel={handleCancel}>
        <p>{modalText}</p>
        <Flex wrap="wrap" gap="small">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={handleOk}
          >
            Yes
          </Button>
          <Button
            type="primary"
            danger
            htmlType="submit"
            onClick={handleCancel}
          >
            No
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default DeleteModal;
