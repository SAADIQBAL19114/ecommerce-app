import React, { useEffect, useState } from "react";
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
import { PlusOutlined } from "@ant-design/icons";

const ProductForm = ({
  onFinish,
  categories,
  normFile,
  loading,
  form,
  product,
  isEdit,
  setEdit,
  setProduct,
}) => {
  const { TextArea } = Input;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const { image, name, description, categoryId, price, quantity } = product;

    if (Object.keys(product).length) {
      if (image) {
        setImageUrl(image);
      }
      // let imageFile;
      form.resetFields(["image"]);
      form.setFieldsValue({
        name,
        description,
        price,
        quantity,
        categoryId,
      });
    }
  }, [isEdit]);
  return (
    <Modal
      onCancel={() => {
        setEdit(false);
        setProduct({});
      }}
      footer={null}
      open={isEdit}
      width={"600px"}
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={() => onFinish(product)}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name={"categoryId"}
          rules={[{ required: true, message: "Please Select the Category" }]}
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
        >
          <Select>
            {categories &&
              categories.map((val, index) => (
                <Select.Option key={index} value={val.id}>
                  {val.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Name"
          name={"name"}
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
          rules={[{ required: true, message: "Please Enter the Name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name={"description"}
          wrapperCol={{
            offset: 1,
            span: 18,
          }}
          rules={[{ required: true, message: "Please Enter the Description" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Price"
          name={"price"}
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
          rules={[{ required: true, message: "Please Enter the Price" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name={"quantity"}
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
          rules={[{ required: true, message: "Please Enter the Quantity" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          name={"image"}
          getValueFromEvent={normFile}
          wrapperCol={{
            offset: 1,
            span: 16,
          }}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            onChange={() => {
              setImageUrl("");
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Product" style={{ width: "50%" }} />
            ) : (
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
