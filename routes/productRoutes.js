const express =require ("express")
const {
  createProductController,
  getAllProductController,
} = require("../controllers/productController.js");

const router = express.Router();

router.post("/create-product", createProductController);
router.get("/all-product", getAllProductController);

module.exports = router;

