import { Layout } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const {id} = useParams()
  return (
    <Layout>
      <h1>Product Details</h1>
      {JSON.stringify(id,null, 4)}
    </Layout>
  );
};

export default ProductDetails;
