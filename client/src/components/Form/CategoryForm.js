import React from "react";
import { Modal } from "antd";

const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
  setVisible,
  visible,
}) => {
  // const onSubmit = (e) => {
  //   handleSubmit();
  //   setVisible(false);
  // };
  return (
    <>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
        // onSubmit={setVisible(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CategoryForm;
