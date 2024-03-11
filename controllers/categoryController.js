const { Category } = require("../sequelize/models");

const createCategroyController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send("error: name is required");
    }
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exist",
      });
    }
    const category = await Category.create({ name });
    res.status(201).json({
      message: "category created",
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category Creation",
      error,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.findAll();
    if (category != "") {
      return res.status(200).json({
        message: "Data Recieved ",
        data: category,
      });
    } else {
      return res.status(400).json({
        message: "no category in the database",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Message",
      error: error.message,
    });
  }
};

const updateCategroyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findOne({ where: { id } });
    if (category == null) {
      res.status(400).json({
        message: "please provide a valid id",
      });
    } else {
      category.name = name;
      category.save();
      res.status(201).json({
        message: "category has been updated",
        data: category,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while updating category",
      error: error.message,
    });
  }
};

const singleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id } });
    if (category != "") {
      return res.status(200).json({
        message: "Data Recieved ",
        data: category,
      });
    } else {
      return res.status(400).json({
        message: "no category in the database",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while getting single category ",
      error: error.message,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id } });
    if (category == null) {
      return res.status(400).json({
        message: "please provide a valid id",
      });
    } else {
      category.destroy();
      res.status(200).json({
        message: "Category deleted succesfully",
        error: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error while deleting category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategroyController,
  getAllCategories,
  updateCategroyController,
  singleCategory,
  deleteCategoryController,
};
