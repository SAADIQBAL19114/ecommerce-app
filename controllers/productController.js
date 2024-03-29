const { Product } = require("../sequelize/models");

const createProductController = async (req, res) => {
  try {
    const { name, description, image,categoryId } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!description) {
      return res.send({ error: "description is Required" });
    }
    const product = await Product.create({
      name,
      description,
      image,
      categoryId
    });
    res.status(201).json({
      message: "Product created",
      data: product,
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
    const product = await Product.findAll();
    console.log(product);
    if (product != "") {
      return res.status(200).json({
        message: "Data Retrieved",
        data: product,
      });
    } else {
      return res.status(400).json({
        message: "no user in the database",
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

module.exports = {
  createProductController,
  getAllProductController,
};
