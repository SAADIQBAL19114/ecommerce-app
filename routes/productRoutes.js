const express = require("express");
const {
  createProductController,
  getAllProductController,
  getSingleProductController,
  deleteProductController,
  editProductController,
  productFilerController,
} = require("../controllers/productController.js");
const { upload } = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.post("/create-product", upload.single("image"), createProductController);
router.get("/all-product", getAllProductController);
router.get("/get-product/:productId", getSingleProductController);
router.delete("/delete-product/:productId", deleteProductController);
router.put(
  "/edit-product/:productId",
  upload.single("image"),
  editProductController
);

// Product Filter

router.post("/product-filter", productFilerController);

module.exports = router;
