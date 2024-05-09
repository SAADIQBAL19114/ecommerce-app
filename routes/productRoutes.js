
const express = require("express");
const {
  createProductController,
  getAllProductController,
  getSingleProductController,
  deleteProductController,
  editProductController,
  productFilerController,
  relatedProductController,
  deleteCartQuantity,
} = require("../controllers/productController.js");
const { upload } = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.post("/create-product", upload.single("image"), createProductController);
router.get("/all-product", getAllProductController);
router.get("/get-product/:productId", getSingleProductController);
router.delete("/delete-product/:productId", deleteProductController);
router.delete("/delete-quantity-of-cart/", deleteCartQuantity);
router.put(
  "/edit-product/:productId",
  upload.single("image"),
  editProductController
);

// Product Filter

router.post("/product-filter", productFilerController);

// Realted Product

router.get("/related-product/:pid/:cid", relatedProductController);

// router.get("/related-product/:cid/:pid", async (req, res) => {
//   try {
//     const { pid, cid } = req.params;
//     console.log(pid, cid);
//     if (cid === 18 && pid === 9) {
//       res.json("console.log");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
