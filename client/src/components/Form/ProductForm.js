import React, { useEffect, useState } from "react";
import { Select, Form, Input, InputNumber, Upload, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ProductForm = ({
  onFinish,
  normFile,
  loading,
  form,
  entry,
  isEdit,
  setEdit,
  setProduct,
  formFields,
  formOpt,
}) => {
  const { TextArea } = Input;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const { image } = entry;
    const resetFields = Object.keys(entry)
      .filter(
        (fields) => !["image", "id", "createdAt", "updatedAt"].includes(fields)
      )
      .reduce((acc, field) => {
        acc[field] = entry[field];
        return acc;
      }, {});

    if (formOpt === "create") {
      setImageUrl("");
    }
    if (Object.keys(entry).length) {
      if (image) {
        setImageUrl(image);
      }

      form.setFieldsValue(resetFields);
    }
  }, [isEdit, formFields, form, entry, formOpt]);
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
        onFinish={() => onFinish(entry)}
        autoComplete="off"
      >
        {formFields
          ?.map((ff) => {
            if (ff.title === "Action") return null;
            return ff.type === "image" ? (
              <Form.Item
                label="Upload"
                valuePropName="fileList"
                name={ff.dataIndex}
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
                    <img
                      src={imageUrl}
                      alt="Product"
                      style={{ width: "50%" }}
                    />
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
            ) : (
              <Form.Item
                label={ff.title}
                name={ff.dataIndex}
                rules={
                  ff.required ? [{ required: true, message: ff.message }] : []
                }
                wrapperCol={{
                  offset: 1,
                  span: 16,
                }}
              >
                {ff.type === "select" ? (
                  <Select>
                    {ff.data &&
                      ff.data.map((val, index) => (
                        <Select.Option key={index} value={val.id}>
                          {val[ff.dataTitle]}
                        </Select.Option>
                      ))}
                  </Select>
                ) : ff.type === "text" ? (
                  <Input />
                ) : ff.type === "number" ? (
                  <InputNumber />
                ) : (
                  <TextArea rows={4} />
                )}
              </Form.Item>
            );
          })
          .filter(Boolean)}

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
