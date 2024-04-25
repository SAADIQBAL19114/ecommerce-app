const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
} = require("../controllers/cartController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add-to-cart/:pId/:uId", addToCart);
router.get("/get/:uId", getCart);
router.put("/update-cart/:uId", updateCart);
router.delete("/delete-cart/:pId/:uId", deleteCartItem);

module.exports = router;
