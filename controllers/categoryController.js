const { Category } = require("../sequelize/models");

const createCategroyController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.send("error: name is required");
    }
    if (!image) {
      return res.send("error: image is required");
    }
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const category = await Category.create({ name, image });
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

const getAllCategories = async (req,res) => {
    try {
        const category = await Category.findAll()
        if(category != ""){
            return res.status(200).json({
                message: "Data Recieved ",
                data: category
            })
        }else{
            return res.status(400).json({
                message: "no category in the database"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            message: "Internal Server Message",
            error: error.message
        })
    }
}

module.exports = {
  createCategroyController,
  getAllCategories,
};

