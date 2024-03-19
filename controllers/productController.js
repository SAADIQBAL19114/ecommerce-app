const { Product } = require("../sequelize/models");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary.js");

const createProductController = async (req, res) => {
  try {
    const { name, description, categoryId, price, quantity } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!description) {
      return res.send({ error: "description is Required" });
    }
    if (!categoryId) {
      return res.send({ error: "categoryId is Required" });
    }

    const imageLocalPath = req.file?.path;
    console.log("Helleo", req.file);
    console.log("CategoryId", categoryId);

    if (!imageLocalPath) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const productImage = await uploadOnCloudinary(imageLocalPath);
    console.log("Product Image", productImage);
    if (!productImage) {
      return res.status(400).json({ message: "Image file is required ...." });
    }
    const product = await Product.create({
      name,
      description,
      image: productImage.url,
      categoryId,
      price,
      quantity,
    });
    res.status(201).send({
      success: true,
      message: "Product created",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product creation",
      error,
    });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const product = await Product.findAll({ order: [["id", "ASC"]] });
    if (product != "") {
      return res.status(200).send({
        success: true,
        message: "All Products Recieved",
        product,
      });
    } else {
      return res.status(400).json({
        message: "no Product in the database",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ where: { id: productId } });
    if (product != "") {
      return res.status(200).json({
        message: "Data Retrieved",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "no Product with this id in the database",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      await deleteFromCloudinary(product.image);
      await product.destroy();
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting product",
      error: error.message,
    });
  }
};

const editProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (req.file) {
      await deleteFromCloudinary(product.image);
    }
    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
      res.status(400).json({ message: "Image file is required" });
    }
    const productImage = await uploadOnCloudinary(imageLocalPath);
    if (!productImage) {
      res.status(400).json({ message: "Image file is required" });
    }

    // product.categoryId= categoryId
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.image = productImage.url;

    console.log("product??>>>>>>", product);
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating product",
      error: error.message,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  getSingleProductController,
  deleteProductController,
  editProductController,
};
