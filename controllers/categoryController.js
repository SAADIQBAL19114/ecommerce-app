const { Category } = require("../sequelize/models");

const createCategroyController = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("name", req.body);
    if (!name) {
      return res.send("error: name is required");
    }
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).send({
        success: true,
        message: "Category Already Exisits",
      });
    }
    const category = await Category.create({ name });
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in Category",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.findAll();
    if (category != "") {
      return res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } else {
      return res.status(400).json({
        message: "no category in the database",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
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
     await category.save();
      res.status(201).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

const singleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ where: { id } });
    if (category != "") {
      return res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } else {
      return res.status(400).json({
        message: "no category in the database",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
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
      await category.destroy();
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
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
